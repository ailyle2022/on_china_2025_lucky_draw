// src/app.ts
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/prizes", async (req: Request, res: Response) => {
    try {
        const prizes = await prisma.prize.findMany();
        res.json(prizes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch prizes" });
    }
});

app.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, cellphone } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                AND: [{ email: email }, { cellphone: cellphone }],
            },
        });
        if (user) {
            const token = uuidv4();

            await prisma.user.update({
                where: { id: user.id },
                data: { token: token },
            });

            res.json({ success: true, message: "User found", token: token });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "error" });
    }
});

app.post("/interest", async (req: Request, res: Response) => {
    try {
        const { token, prizeId } = req.body;

        if (!token || !prizeId) {
            res.status(400).json({ success: false, message: "Invalid request" });
            return;
        }

        const user = await prisma.user.findFirst({
            where: { token: token },
        });

        if (!user || user === null) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        await prisma.interest.deleteMany({
            where: {
                userId: user.id,
            },
        });

        await prisma.interest.create({
            data: {
                userId: user.id,
                prizeId: prizeId,
            },
        });

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "error" });
    }
});

app.post("/draw", async (req: Request, res: Response) => {
    try {
        const { prizeId } = req.body;

        if (!prizeId) {
            res.status(400).json({ success: false, message: "Invalid request" });
            return;
        }

        const user = await prisma.user.findMany({
            where: {
                AND: [{ token: { not: null } }, { prizeId: 0 }],
            },
        });

        // 提取用户的 name 属性并存入数组
        const userNames = user.map((user) => user.name);

        // 提取对该prize感兴趣的用户ID
        const ids = await prisma.interest.findMany({
            where: {
                prizeId: prizeId,
            },
            include: {
                user: true, // 关联 user 表
            },
        });

        const wishers = [];

        // 将用户名字加入数组
        for (const id of ids) {
            wishers.push(id.user.name);
            userNames.push(id.user.name);
        }

        // 从userNames随机抽取一位用户名作为中奖者
        const winner = userNames[Math.floor(Math.random() * userNames.length)];

        // 写入winner的prizeId
        await prisma.user.update({
            where: { name: winner },
            data: { prizeId: prizeId },
        });

        res.json({
            success: true,
            data: {
                wishers: wishers,
                userPool: userNames,
                winner: winner,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "error" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
