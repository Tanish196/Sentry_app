import { Router } from "express";
import { prisma } from "../prisma.js";
const router = Router();
// POST /contacts
// body: { userId: string, name?: string, email?: string, phone?: string, relation?: string }
router.post("/", async (req, res) => {
    try {
        const { userId, name, email, phone, relation } = req.body;
        console.log("[CONTACTS][CREATE] Request received", {
            userId,
            email,
            hasName: Boolean(name),
            hasPhone: Boolean(phone),
            relation,
        });
        if (!userId || !email) {
            console.warn("[CONTACTS][CREATE] Missing required fields", {
                userIdPresent: Boolean(userId),
                emailPresent: Boolean(email),
            });
            return res.status(400).json({ message: "userId and email required" });
        }
        const contact = await prisma.emergencyContact.create({
            data: {
                userId,
                name: name ?? "",
                phone: phone ?? "",
                email,
                relation: relation ?? "FRIEND",
            },
        });
        console.log("[CONTACTS][CREATE] Contact created", {
            contactId: contact.id,
            userId: contact.userId,
            email: contact.email,
        });
        return res.status(201).json({ message: "Contact created", contact });
    }
    catch (err) {
        console.error("[CONTACTS][CREATE] Unexpected error", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
export default router;
//# sourceMappingURL=contacts.js.map