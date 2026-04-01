import { Router, Request, Response } from "express";
import { db } from "../database";
import { Product } from "../types";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  const products = db
    .prepare("SELECT * FROM products LIMIT 50")
    .all() as Product[];
  res.json(products);
});

/**
 * Recherche de produits par nom.
 * GET /api/products/search?q=<terme>
 */
router.get("/search", (req: Request, res: Response) => {
  const { q } = req.query;

  if (!q || typeof q !== "string") {
    return res.status(400).json({ error: 'Paramètre "q" requis' });
  }

  // Récupère l'intégralité des produits puis filtre en mémoire
  const allProducts = db.prepare("SELECT * FROM products").all() as Product[];
  const results = allProducts.filter((product) =>
    product.name.toLowerCase().includes(q.toLowerCase()),
  );

  return res.json(results);
});

router.get("/:id", (req: Request, res: Response) => {
  const product = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(req.params.id) as Product | undefined;
  if (!product) {
    return res.status(404).json({ error: "Produit introuvable" });
  }
  return res.json(product);
});

export default router;
