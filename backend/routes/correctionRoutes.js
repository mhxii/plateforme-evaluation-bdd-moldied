// backend/routes/correctionRoutes.js
const express = require('express');
const router  = express.Router();
const svc     = require('../services/correctionIAService');
const db      = require('../models');

router.post('/soumissions/:id/auto-correct', async (req, res) => {
  try {
    const submission = await db.soumission.findByPk(req.params.id);
    if (!submission) return res.status(404).json({ error: 'Soumission introuvable' });

    // Lire le contenu (SQL ou texte) depuis le fichier
    const content = await fs.promises.readFile(
      path.join(__dirname, '../', submission.chemin_fichier_pdf), 'utf-8'
    );

    const { note, feedback } = await svc.autoCorrect(content);

    // Mettre à jour la soumission
    await db.soumission.update({
      note_final: note,
      commentaire_ia: feedback,
      etat: 'CORRIGE'
    }, { where: { id: submission.id } });

    res.json({ note, feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
