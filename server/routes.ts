import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const tradeSchema = z.object({
  projectId: z.number().int().positive(),
  projectName: z.string().min(1),
  credits: z.number().int().positive(),
  pricePerCredit: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return isFinite(num) && num > 0;
    },
    { message: "Price must be a positive finite number" }
  ),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Trading API routes
  
  // Get user portfolio
  app.get("/api/portfolio", async (req, res) => {
    try {
      const userId = "demo-user-123"; // TODO: Get from session/auth
      const portfolio = await storage.getUserPortfolio(userId);
      res.json(portfolio);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      res.status(500).json({ error: "Failed to fetch portfolio" });
    }
  });

  // Get user trades
  app.get("/api/trades", async (req, res) => {
    try {
      const userId = "demo-user-123"; // TODO: Get from session/auth
      const limit = parseInt(req.query.limit as string) || 10;
      const trades = await storage.getUserTrades(userId, limit);
      res.json(trades);
    } catch (error) {
      console.error("Error fetching trades:", error);
      res.status(500).json({ error: "Failed to fetch trades" });
    }
  });

  // Buy carbon credits
  app.post("/api/trade/buy", async (req, res) => {
    try {
      const userId = "demo-user-123"; // TODO: Get from session/auth
      
      const validation = tradeSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors[0].message });
      }

      const { projectId, projectName, credits, pricePerCredit } = validation.data;
      const totalAmount = (credits * parseFloat(pricePerCredit)).toFixed(2);

      // Get user to check balance
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const currentBalance = parseFloat(user.balance || "0");
      if (currentBalance < parseFloat(totalAmount)) {
        return res.status(400).json({ error: "Insufficient balance" });
      }

      // Create trade record
      const trade = await storage.createTrade({
        userId,
        projectId,
        projectName,
        type: "buy",
        credits,
        pricePerCredit,
        totalAmount,
      });

      // Update or create portfolio item
      const portfolioItem = await storage.getPortfolioItem(userId, projectId);
      if (portfolioItem) {
        const existingCredits = parseInt(portfolioItem.credits.toString());
        const totalCredits = existingCredits + credits;
        
        if (totalCredits <= 0) {
          return res.status(400).json({ error: "Invalid credit calculation" });
        }
        
        const existingValue = parseFloat(portfolioItem.averagePrice) * existingCredits;
        const totalValue = existingValue + parseFloat(totalAmount);
        const newAveragePrice = (totalValue / totalCredits).toFixed(2);
        
        await storage.updatePortfolioItem(portfolioItem.id, totalCredits, newAveragePrice);
      } else {
        await storage.createPortfolioItem({
          userId,
          projectId,
          projectName,
          credits,
          averagePrice: pricePerCredit,
        });
      }

      // Update user balance
      const newBalance = (currentBalance - parseFloat(totalAmount)).toFixed(2);
      await storage.updateUserBalance(userId, newBalance);

      res.json({ success: true, trade });
    } catch (error) {
      console.error("Error processing buy trade:", error);
      res.status(500).json({ error: "Failed to process trade" });
    }
  });

  // Sell carbon credits
  app.post("/api/trade/sell", async (req, res) => {
    try {
      const userId = "demo-user-123"; // TODO: Get from session/auth
      
      const validation = tradeSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors[0].message });
      }

      const { projectId, projectName, credits, pricePerCredit } = validation.data;

      // Check if user has enough credits
      const portfolioItem = await storage.getPortfolioItem(userId, projectId);
      const existingCredits = portfolioItem ? parseInt(portfolioItem.credits.toString()) : 0;
      
      if (!portfolioItem || existingCredits < credits) {
        return res.status(400).json({ error: "Insufficient credits" });
      }

      const totalAmount = (credits * parseFloat(pricePerCredit)).toFixed(2);

      // Create trade record
      const trade = await storage.createTrade({
        userId,
        projectId,
        projectName,
        type: "sell",
        credits,
        pricePerCredit,
        totalAmount,
      });

      // Update portfolio item
      const remainingCredits = parseInt(portfolioItem.credits.toString()) - credits;
      await storage.updatePortfolioItem(
        portfolioItem.id,
        remainingCredits,
        portfolioItem.averagePrice
      );

      // Update user balance
      const user = await storage.getUser(userId);
      if (user) {
        const currentBalance = parseFloat(user.balance || "0");
        const newBalance = (currentBalance + parseFloat(totalAmount)).toFixed(2);
        await storage.updateUserBalance(userId, newBalance);
      }

      res.json({ success: true, trade });
    } catch (error) {
      console.error("Error processing sell trade:", error);
      res.status(500).json({ error: "Failed to process trade" });
    }
  });

  // Get user balance
  app.get("/api/balance", async (req, res) => {
    try {
      const userId = "demo-user-123"; // TODO: Get from session/auth
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ balance: user.balance });
    } catch (error) {
      console.error("Error fetching balance:", error);
      res.status(500).json({ error: "Failed to fetch balance" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
