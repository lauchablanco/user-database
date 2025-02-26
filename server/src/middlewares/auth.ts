import { Request, Response, NextFunction } from "express";

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.header("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    res.status(403).json({ message: "Forbidden: Invalid API Key" });
    return;
  }

  next(); // ✅ Always call next() to continue request processing
};

export default apiKeyMiddleware;