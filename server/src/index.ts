// src/app.ts
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/prizes', async (req: Request, res: Response) => {
    try {
        const prizes = await prisma.prize.findMany();
        res.json(prizes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch prizes' });
    }
});

app.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, cellphone } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                AND: [
                    { email: email },
                    { cellphone: cellphone }
                ]
            }
        });
        if (user) {
            const token = uuidv4();

            await prisma.user.update({
                where: { id: user.id },
                data: { token: token }
            });

            res.json({ success: true, message: 'User found', token: token });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});