// backend/services/sujetService.js
const db = require('../models');

module.exports = {
  /**
   * Récupère tous les sujets publiés par un professeur
   * @param {number} professeurId
   */
  getAll: () => {
      return db.sujet.findAll({
        include: db.utilisateur,
        order: [['date_creation', 'DESC']]
      });
    },

  /**
   * Récupère un sujet par son ID
   * @param {number} id
   */
  getById: id => db.sujet.findByPk(id, {
    include: [{ model: db.utilisateur, as: 'professeur', attributes: ['id','nom','prenom'] }]
  }),

  create: data => db.sujet.create({
    titre: data.titre,
    description: data.description,
    chemin_fichier_pdf: data.referenceFilePath || '',
    chemin_fichier_correction_pdf: '',
    date_limite: data.dateLimite,
    etat: 'PUBLIE',
    professeur_id: data.professeurId
  }),


  /**
   * Crée un nouveau sujet
   */
  create: (data) => {
    return db.sujet.create({
      titre: data.titre,
      description: data.description,
      chemin_fichier_pdf: data.referenceFilePath || '',
      chemin_fichier_correction_pdf: '',
      date_limite: data.dateLimite,
      etat: 'PUBLIE',
      professeur_id: data.professeurId
    });
  },

  /**
   * Met à jour un sujet
   */
  update: (id, data) => {
    return db.sujet.update(data, { where: { id } });
  },

  /**
   * Supprime un sujet
   */
  remove: (id) => {
    return db.sujet.destroy({ where: { id } });
  },

  /**
   * Upload / met à jour le modèle de correction pour un sujet
   * @param {number} id 
   * @param {string} filePath 
   */
  uploadCorrectionModel: async (id, filePath) => {
    await db.sujet.update(
      { chemin_fichier_correction_pdf: filePath },
      { where: { id } }
    );
    return db.sujet.findByPk(id);
  }
};
