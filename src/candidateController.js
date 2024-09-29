// candidateController.js

const Candidate = require("./candidate.js");

// Crear un nuevo candidato
exports.createCandidate = async (req, res) => {
  try {
    const { name, email, resume } = req.body;

    const newCandidate = await Candidate.create({ name, email, resume });
    res.status(201).json(newCandidate);
  } catch (error) {
    console.error('Error al crear candidato:', error);
    res.status(500).json({ message: 'Error al crear candidato.', error: error.message });
  }
};

// Obtener todos los candidatos
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.findAll();
    res.json(candidates);
  } catch (error) {
    console.error('Error al obtener candidatos:', error);
    res.status(500).json({ error: 'Error al obtener candidatos' });
  }
};

// Obtener un candidato por ID
exports.getCandidateById = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findByPk(id);
    if (!candidate) return res.status(404).json({ message: 'Candidato no encontrado' });

    res.json(candidate);
  } catch (error) {
    console.error('Error al obtener candidato:', error);
    res.status(500).json({ message: 'Error al obtener candidato', error: error.message });
  }
};

// Actualizar un candidato
exports.updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, resume } = req.body;

    const candidate = await Candidate.findByPk(id);
    if (!candidate) return res.status(404).json({ message: 'Candidato no encontrado' });

    candidate.name = name;
    candidate.email = email;
    candidate.resume = resume;
    await candidate.save();

    res.json(candidate);
  } catch (error) {
    console.error('Error al actualizar candidato:', error);
    res.status(500).json({ message: 'Error al actualizar candidato', error: error.message });
  }
};

// Eliminar un candidato
exports.deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findByPk(id);
    if (!candidate) return res.status(404).json({ message: 'Candidato no encontrado' });

    await candidate.destroy();
    res.json({ message: 'Candidato eliminado con éxito.' });
  } catch (error) {
    console.error('Error al eliminar candidato:', error);
    res.status(500).json({ message: 'Error al eliminar candidato.', error: error.message });
  }
};