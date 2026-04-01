import { db, initializeSchema } from './database';

initializeSchema();

const categories = ['Smartphones', 'Laptops', 'Tablettes', 'Accessoires', 'Audio', 'Photo', 'Gaming', 'TV & Écrans'];

const baseProducts = [
  { name: 'iPhone 15 Pro', description: 'Smartphone Apple avec puce A17 Pro', price: 1199.99, category: 'Smartphones' },
  { name: 'Samsung Galaxy S24', description: 'Flagship Android avec IA intégrée', price: 999.99, category: 'Smartphones' },
  { name: 'Google Pixel 8', description: 'Smartphone Google avec Tensor G3', price: 799.99, category: 'Smartphones' },
  { name: 'OnePlus 12', description: 'Smartphone avec charge rapide 100W', price: 749.99, category: 'Smartphones' },
  { name: 'Xiaomi 14', description: 'Optique Leica et charge 90W', price: 899.99, category: 'Smartphones' },
  { name: 'MacBook Pro 14"', description: 'Laptop Apple avec puce M3 Pro', price: 2199.99, category: 'Laptops' },
  { name: 'Dell XPS 15', description: 'Laptop premium avec écran OLED', price: 1799.99, category: 'Laptops' },
  { name: 'Lenovo ThinkPad X1 Carbon', description: 'Ultrabook professionnel léger', price: 1599.99, category: 'Laptops' },
  { name: 'ASUS ROG Zephyrus G14', description: 'Laptop gaming compact AMD', price: 1399.99, category: 'Laptops' },
  { name: 'HP Spectre x360', description: 'Convertible 2-en-1 premium', price: 1499.99, category: 'Laptops' },
  { name: 'iPad Pro 12.9"', description: 'Tablette Apple avec puce M2', price: 1099.99, category: 'Tablettes' },
  { name: 'Samsung Galaxy Tab S9', description: 'Tablette Android haut de gamme', price: 799.99, category: 'Tablettes' },
  { name: 'Sony WH-1000XM5', description: 'Casque sans fil ANC premium', price: 349.99, category: 'Audio' },
  { name: 'AirPods Pro 2', description: 'Écouteurs Apple avec ANC adaptatif', price: 279.99, category: 'Audio' },
  { name: 'Sony A7 IV', description: 'Hybride plein format 33 Mpx', price: 2499.99, category: 'Photo' },
  { name: 'Canon EOS R6 Mark II', description: 'Hybride polyvalent 40 im/s', price: 2799.99, category: 'Photo' },
  { name: 'PS5 Slim', description: 'Console Sony nouvelle génération', price: 449.99, category: 'Gaming' },
  { name: 'Xbox Series X', description: 'Console Microsoft 4K 120fps', price: 499.99, category: 'Gaming' },
  { name: 'LG OLED C3 55"', description: 'TV OLED 4K 120Hz', price: 1299.99, category: 'TV & Écrans' },
  { name: 'Samsung QN90C 65"', description: 'TV Neo QLED 4K', price: 1599.99, category: 'TV & Écrans' },
  { name: 'Coque iPhone 15', description: 'Protection silicone premium', price: 29.99, category: 'Accessoires' },
  { name: 'Chargeur MagSafe 15W', description: 'Charge sans fil rapide Apple', price: 39.99, category: 'Accessoires' },
  { name: 'Hub USB-C 7-en-1', description: 'Dock multiport universel', price: 49.99, category: 'Accessoires' },
  { name: 'SSD Samsung 990 Pro 1To', description: 'SSD NVMe M.2 PCIe 4.0', price: 129.99, category: 'Accessoires' },
  { name: 'Clavier Logitech MX Keys', description: 'Clavier sans fil multi-appareils', price: 109.99, category: 'Accessoires' },
];

const stmt = db.prepare(
  'INSERT INTO products (name, description, price, category) VALUES (?, ?, ?, ?)'
);

const insertMany = db.transaction(() => {
  // Insert base products
  for (const p of baseProducts) {
    stmt.run(p.name, p.description, p.price, p.category);
  }

  // Generate extra products to reach 10 000 total
  for (let i = baseProducts.length + 1; i <= 10_000; i++) {
    const category = categories[i % categories.length];
    stmt.run(
      `Produit ${i}`,
      `Description du produit numéro ${i}`,
      Number((Math.random() * 1900 + 99).toFixed(2)),
      category
    );
  }
});

insertMany();

console.log('Base de données initialisée avec 10 000 produits.');
