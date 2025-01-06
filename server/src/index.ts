// src/app.ts
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

app.get("/prizes", async (req: Request, res: Response) => {
  try {
    const prizes = await prisma.prize.findMany();
    res.json(prizes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prizes" });
  }
});

app.get("/nameList", async (req: Request, res: Response) => {
  try {
    const nameList = await prisma.user.findMany({
      where: {
        voteable: true
      }
    });
    res.json(nameList);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch name list" });
  }
});

app.get("/voteResult", async (req: Request, res: Response) => {
  try {
    const voteCounts = await prisma.user.groupBy({
      by: ['vote'],
      _count: {
        vote: true,
      },
      where: {
        NOT: [
          {
            vote: null,
          },
          {
            vote: '',
          },
        ],
      },
    });

    const filteredVoteCounts = voteCounts.filter(group => group.vote !== "");
    const formattedVoteCounts = filteredVoteCounts.map(group => ({
      vote: group.vote,
      count: group._count.vote,
    }));
    formattedVoteCounts.sort((a, b) => b.count - a.count);
    const topVoteCounts = formattedVoteCounts.slice(0, 8);

    res.json(topVoteCounts);
  } catch (error) {
    console.error("Error fetching vote counts:", error);
    res.status(500).json({ error: "Failed to fetch vote counts" });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, cellphone, } = req.body;

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

      res.json({
        success: true, message: "User found", data: {
          token: token,
          isAdmin: user.isAdmin
        }
      })
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

    // 判断抽奖是否开始，如已开始则无法修改
    const winUser = await prisma.user.findFirst({
      where: {
        prizeId: { not: 0 },
      },
    });

    if (winUser) {
      res
        .status(400)
        .json({ success: false, message: "已经开始抽奖，无法更换心愿单" });
      return;
    }

    const interest = await prisma.interest.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (interest) {
      await prisma.interest.update({
        where: {
          id: interest.id,
        },
        data: {
          prizeId: prizeId,
        },
      });
    } else {
      await prisma.interest.create({
        data: {
          userId: user.id,
          prizeId: prizeId,
        },
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "error" });
  }
});

app.post("/vote", async (req: Request, res: Response) => {
  try {
    const { token, name } = req.body;

    if (!token || !name || name === "") {
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

    // vote
    if (user.vote != "" && user.vote != null) {
      res.status(400).json({ success: false, message: "Already voted" });
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { vote: name },
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "error" });
  }
});

app.post("/draw", async (req: Request, res: Response) => {
  try {
    const { prizeId, token } = req.body;

    if (!token || !prizeId) {
      res.status(400).json({ success: false, message: "Invalid request" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: { token: token },
    });

    if (!user || user === null || !user.isAdmin) {
      res.status(404).json({ success: false, message: "User is not admin" });
      return;
    }

    // 获取所有已中奖用户
    const winners = await prisma.user.findMany({
      where: {
        prizeId: { not: 0 },
      },
    });

    const winnersArray = winners.map((winner) => winner.name);

    // 获取所有可抽奖用户
    const userPool = await prisma.user.findMany({
      where: {
        AND: [{ token: { not: null } }, { prizeId: 0 }],
      },
    });

    // 提取用户的 name 属性并存入数组
    const userPoolArray = userPool.map((user) => user.name);

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

    // 将用户名字加入数组（排除已中奖）
    for (const id of ids) {
      if (!winnersArray.includes(id.user.name)) {
        wishers.push(id.user.name);
        userPoolArray.push(id.user.name);
      }
    }

    // 从userNames随机抽取一位用户名作为中奖者
    const winner =
      userPoolArray[Math.floor(Math.random() * userPoolArray.length)];

    if (winner === null || winner === undefined) {
      res.status(404).json({ success: false, message: "No winner found" });
      return;
    }

    // 写入winner的prizeId
    await prisma.user.update({
      where: { name: winner },
      data: { prizeId: prizeId },
    });

    res.json({
      success: true,
      data: {
        wishers: wishers,
        userPool: userPoolArray,
        winner: winner,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "error" });
  }
});

app.post("/reset", async (req: Request, res: Response) => {
  // 判断是否是Admin
  const { token, prizeId } = req.body;

  if (!token) {
    res.status(400).json({ success: false, message: "Invalid request" });
    return;
  }

  const user = await prisma.user.findFirst({
    where: { token: token },
  });

  if (!user || user === null || !user.isAdmin) {
    res.status(404).json({ success: false, message: "User is not admin" });
    return;
  }

  // 重制
  await prisma.user.updateMany({
    data: {
      prizeId: 0
    },
    where: {
      prizeId: prizeId
    }
  });

  res.json({ success: true });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
