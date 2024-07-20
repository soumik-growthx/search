import { Router } from "express";
import AnimeService from "../services/anime.services.js";

const animeRouter = Router();

animeRouter.get("/fuzzy", async (req, res) => {
  const query = req.query.q?.toString() || "";
  if (!query) {
    const header = await AnimeService.FindOne()
    return res.status(200).json({ success: true, animes: header });
  }

  console.log("Searching for", query);
  
  const cartoons = await AnimeService.FuzzySearch(query);
  res.status(200).json({ success: true, animes: cartoons });
});

animeRouter.get("/semantic", async (req, res) => {
  const query = req.query.q?.toString() || "";
  if (!query) {
    return res.status(200).json({ success: true, animes: [] });
  }

  const cartoons = await AnimeService.SemanticSearch(query);
  res.status(200).json({ success: true, animes: cartoons });
});

animeRouter.post("/updateFeed", async (_, res) => {
  AnimeService.FeedAnimeToVectorStore();
  res.status(200).json({ success: true });
});

export default animeRouter;
