// backend/services/correctionIAService.js
const { spawnSync } = require('child_process');
const DeepSeek = require('deepseek');        // imaginary JS client
const parser     = require('node-sql-parser'); // pour l’analyse SQL

// initialisation de l’index DeepSeek
const deepseek = new DeepSeek({ /* config */ });

module.exports = {
  /**
   * Indexe un document de correction fourni par le prof.
   * @param {string} filePath  Chemin vers le PDF/TXT du prof
   */
  async indexModel(filePath) {
    const text = await extractTextFromPDF(filePath); // ui/pdf-parser
    await deepseek.add({
      id: `model-${Date.now()}`,
      content: text
    });
  },

  /**
   * Corrige automatiquement une soumission étudiante.
   * @param {string} submissionContent  Le SQL (ou texte) de l’étudiant
   * @returns {{ note: number, feedback: string }}
   */
  async autoCorrect(submissionContent) {
    // 1) parse SQL
    let syntaxOk = true, syntaxError = null;
    try {
      parser.parse(submissionContent);
    } catch (err) {
      syntaxOk = false;
      syntaxError = err.message;
    }

    // 2) récupération de la « correction » du prof
    const hits = await deepseek.search({
      query: submissionContent,
      topK: 3
    });
    const profHints = hits.map(h=> h.content).join("\n---\n");

    // 3) construire le prompt pour Ollama
    const prompt = `
Vous êtes un correcteur automatisé de SQL.  
Voici des extraits du modèle de correction du prof :  
${profHints}

La soumission de l’étudiant est la suivante :
\`\`\`sql
${submissionContent}
\`\`\`

${syntaxOk ? "" : `⚠️ La syntaxe SQL est invalide: ${syntaxError}`}

1) Donnez une note sur 20, en tenant compte de l’exactitude, la clarté et la performance.  
2) Fournissez un feedback détaillé (erreurs, suggestions d’amélioration).

**Répondez strictement en JSON** :  
\`\`\`json
{ "note": ..., "feedback": "..." }
\`\`\`
`;

    // 4) appel à Ollama en ligne de commande (ou via REST quand dispo)
    const res = spawnSync('ollama', ['run', 'votre-modele-sql-corrector', '--prompt', prompt], {
      encoding: 'utf-8'
    });
    if (res.error) throw res.error;
    const out = res.stdout.trim();
    // on parse le JSON
    return JSON.parse(out);
  }
};
