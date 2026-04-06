import json
import base64
import boto3
import os

s3 = boto3.client('s3', region_name='ap-south-1')
data_cache = None

S3_BUCKET = os.environ['MODEL_BUCKET']

def load_feature_store():
    global data_cache
    if data_cache is None:
        print("Loading feature store...")
        obj = s3.get_object(Bucket=S3_BUCKET, Key='datasets/feature_store.json')
        data = json.loads(obj['Body'].read())
        data_cache = {item['area_id']: item for item in data}
        print(f"Loaded {len(data_cache)} areas")
    return data_cache

def calculate_multipliers(hour, weather, event_density):
    time_mult = 15 if (20 <= hour or hour <= 6) else 0
    weather_mult = {
        'clear': 0,
        'rain': 5,
        'monsoon': 10,
        'fog': 10
    }.get(weather, 0)
    event_mult = {
        'low': 0,
        'medium': 5,
        'high': 10
    }.get(event_density, 0)
    
    return {
        'time': time_mult,
        'weather': weather_mult,
        'event': event_mult,
        'total': time_mult + weather_mult + event_mult
    }


def get_request_path(event):
    path = event.get('rawPath') or event.get('path') or '/'
    if not isinstance(path, str):
        return '/'
    if '?' in path:
        path = path.split('?', 1)[0]
    return '/' + path.strip('/')


def route_matches(path, route):
    normalized_route = '/' + route.strip('/')
    return path == normalized_route or path.endswith(normalized_route)


def parse_json_body(event):
    body = event.get('body')
    if body is None or body == '':
        return {}

    if event.get('isBase64Encoded') and isinstance(body, str):
        try:
            body = base64.b64decode(body).decode('utf-8')
        except Exception:
            return {}

    if isinstance(body, dict):
        return body

    if isinstance(body, str):
        try:
            return json.loads(body)
        except json.JSONDecodeError:
            return {}

    return {}

def lambda_handler(event, context):
    path = get_request_path(event)
    method = (
        event.get('requestContext', {}).get('http', {}).get('method')
        or event.get('httpMethod', 'GET')
    )
    method = str(method).upper()

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization'
            },
            'body': ''
        }
    
    if route_matches(path, '/areas/scores') and method == 'GET':
        data = load_feature_store()
        areas = [
            {
                'area_id': v['area_id'],
                'base_score': v['base_score'],
                'risk_category': v['risk_category']
            }
            for v in data.values()
        ]
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'areas': areas,
                'total': len(areas)
            })
        }
    
    if route_matches(path, '/score/area') and method == 'POST':
        body = parse_json_body(event)
        area_id = body.get('area_id')
        try:
            hour = int(body.get('hour', 12))
        except (TypeError, ValueError):
            hour = 12
        hour = max(0, min(hour, 23))
        weather = body.get('weather', 'clear')
        event_density = body.get('event_density', 'low')
        
        data = load_feature_store()
        area = data.get(area_id)
        
        if not area:
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Area not found'})
            }
        
        base_score = area['base_score']
        base_category = area['risk_category']
        
        multipliers = calculate_multipliers(hour, weather, event_density)
        
        final_score = base_score + multipliers['total']
        
        if final_score < 33:
            final_category = 'Low'
        elif final_score < 66:
            final_category = 'Medium'
        else:
            final_category = 'High'
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'area_id': area_id,
                'base_risk': {
                    'score': base_score,
                    'category': base_category,
                    'source': 'precomputed'
                },
                'multipliers': multipliers,
                'final_risk': {
                    'score': round(final_score, 2),
                    'category': final_category
                },
                'context': {
                    'hour': hour,
                    'weather': weather,
                    'event_density': event_density
                }
            })
        }
    
    return {
        'statusCode': 404,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Not found'})
    }