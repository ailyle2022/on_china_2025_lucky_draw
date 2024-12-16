// src/app.ts
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET endpoint to fetch all prizes
app.get('/prizes', async (req: Request, res: Response) => {
  try {
    const prizes = await prisma.prize.findMany();
    res.json(prizes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prizes' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});