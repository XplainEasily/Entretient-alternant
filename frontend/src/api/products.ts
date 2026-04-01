import { Product } from '../types';

const BASE_URL = '/api/products';

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Erreur lors de la récupération des produits');
  return res.json();
}

export async function searchProducts(query: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Erreur lors de la recherche');
  return res.json();
}
