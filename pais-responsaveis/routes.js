const express = require('express');
const pool = require('./db');
const Responsavel = require('./responsavel'); // Supondo que você tenha uma classe Responsavel definida

const router = express.Router();

// Listar todos os responsáveis
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM responsaveis');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar responsáveis' });
  }
});

// Obter um responsável pelo ID
router.get('/responsavel/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM responsaveis WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Responsável não encontrado' });
    } else {
      const row = result.rows[0];
      const responsavel = new Responsavel(row.id, row.nome, row.cpf, row.telefone, row.nome_filho);
      res.json(responsavel);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar responsável' });
  }
});

// Criar um novo responsável
router.post('/responsavel', async (req, res) => {
  const { nome, cpf, telefone, nome_filho } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO responsaveis (nome, cpf, telefone, nome_filho) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, cpf, telefone, nome_filho]
    );
    const row = result.rows[0];
    const responsavel = new Responsavel(row.id, row.nome, row.cpf, row.telefone, row.nome_filho);
    res.status(201).json(responsavel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar responsável' });
  }
});

// Atualizar um responsável
router.put('/responsavel/:id', async (req, res) => {
  const id = req.params.id;
  const { nome, cpf, telefone, nome_filho } = req.body;
  try {
    const result = await pool.query(
      'UPDATE responsaveis SET nome = $1, cpf = $2, telefone = $3, nome_filho = $4 WHERE id = $5 RETURNING *',
      [nome, cpf, telefone, nome_filho, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Responsável não encontrado' });
    } else {
      const row = result.rows[0];
      const responsavel = new Responsavel(row.id, row.nome, row.cpf, row.telefone, row.nome_filho);
      res.json(responsavel);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar responsável' });
  }
});

// Deletar um responsável
router.delete('/responsavel/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM responsaveis WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Responsável não encontrado' });
    } else {
      res.json({ message: 'Responsável excluído com sucesso' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir responsável' });
  }
});

module.exports = router;
