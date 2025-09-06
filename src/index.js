import express from 'express';

const app = express();
app.use(express.json());

let idSeq = 1;
const orders = [];

app.get('/health', (_req, res) => res.json({ ok: true, service: 'orders-service', count: orders.length }));
app.get('/orders', (_req, res) => res.json(orders.slice().reverse()));
app.post('/orders', (req, res) => {
  const { item, quantity } = req.body || {};
  if (!item || !quantity) return res.status(400).json({ error: 'item and quantity required' });
  const order = { id: idSeq++, item, quantity, created_at: new Date().toISOString() };
  orders.push(order);
  res.status(201).json(order);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`orders-service listening on :${PORT}`));
