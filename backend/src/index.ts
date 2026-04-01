import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initializeSchema } from './database';
import productsRouter from './routes/products';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

initializeSchema();

app.use('/api/products', productsRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend démarré sur http://localhost:${PORT}`);
});
