// backend/services/soumissionService.js
const db = require('../models');

module.exports = {
  getAll: () =>
    db.soumission.findAll({ include: [db.utilisateur, db.sujet] }),

  getById: id =>
    db.soumission.findByPk(id),

  create: data =>
    db.soumission.create(data),

  update: (id, data) =>
    db.soumission.update(data, { where: { id } }),

  remove: id =>
    db.soumission.destroy({ where: { id } }),

  /**
   * Retourne les statistiques de correction :
   *  - totalSubmissions
   *  - pendingReview (etat = 'SOUMIS')
   *  - reviewedSubmissions (etat = 'CORRIGE')
   *  - averageScore (sur note_automatique des corrigés)
   */
  getStats: async () => {
    const total = await db.soumission.count();
    const pending = await db.soumission.count({ where: { etat: 'SOUMIS' } });
    const reviewed = await db.soumission.count({ where: { etat: 'CORRIGE' } });
    const sumScores = await db.soumission.sum('note_automatique', { where: { etat: 'CORRIGE' } });
    const average = reviewed > 0 ? sumScores / reviewed : 0;
    return {
      totalSubmissions: total,
      pendingReview: pending,
      reviewedSubmissions: reviewed,
      averageScore: Number(average.toFixed(1))
    };
  }
};
