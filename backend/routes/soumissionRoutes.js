// backend/routes/soumissionRoutes.js
const router = require('express').Router();
const svc = require('../services/soumissionService');

// Stats de correction
router.get('/stats', async (req, res) => {
  try {
    const stats = await svc.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes existantes
router.get('/', async (req, res) => res.json(await svc.getAll()));
router.get('/:id', async (req, res) => res.json(await svc.getById(req.params.id)));
router.post('/', async (req, res) => res.json(await svc.create(req.body)));
router.put('/:id', async (req, res) => res.json(await svc.update(req.params.id, req.body)));
router.delete('/:id', async (req, res) => res.json(await svc.remove(req.params.id)));

module.exports = router;
