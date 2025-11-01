import { db } from "./db";
import { users, portfolios, trades, type User, type InsertUser, type Portfolio, type InsertPortfolio, type Trade, type InsertTrade } from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserBalance(userId: string, balance: string): Promise<void>;
  
  getUserPortfolio(userId: string): Promise<Portfolio[]>;
  getPortfolioItem(userId: string, projectId: number): Promise<Portfolio | undefined>;
  createPortfolioItem(portfolio: InsertPortfolio): Promise<Portfolio>;
  updatePortfolioItem(id: string, credits: number, averagePrice: string): Promise<void>;
  
  getUserTrades(userId: string, limit?: number): Promise<Trade[]>;
  createTrade(trade: InsertTrade): Promise<Trade>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUserBalance(userId: string, balance: string): Promise<void> {
    await db.update(users).set({ balance }).where(eq(users.id, userId));
  }

  async getUserPortfolio(userId: string): Promise<Portfolio[]> {
    return db.select().from(portfolios).where(eq(portfolios.userId, userId));
  }

  async getPortfolioItem(userId: string, projectId: number): Promise<Portfolio | undefined> {
    const [item] = await db.select().from(portfolios)
      .where(and(eq(portfolios.userId, userId), eq(portfolios.projectId, projectId)));
    return item;
  }

  async createPortfolioItem(portfolio: InsertPortfolio): Promise<Portfolio> {
    const [item] = await db.insert(portfolios).values(portfolio).returning();
    return item;
  }

  async updatePortfolioItem(id: string, credits: number, averagePrice: string): Promise<void> {
    await db.update(portfolios).set({ credits, averagePrice }).where(eq(portfolios.id, id));
  }

  async getUserTrades(userId: string, limit: number = 10): Promise<Trade[]> {
    return db.select().from(trades)
      .where(eq(trades.userId, userId))
      .orderBy(desc(trades.createdAt))
      .limit(limit);
  }

  async createTrade(trade: InsertTrade): Promise<Trade> {
    const [newTrade] = await db.insert(trades).values(trade).returning();
    return newTrade;
  }
}

export const storage = new DatabaseStorage();
