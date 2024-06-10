import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();

// GET - lista todos os registros
router.get('/', async (req, res) => {
  let collection = await db.collection('records');
  let records = await collection.find().toArray();
  res.send(records).status(200);
});

// GET - lista um registro por id
router.get('/:id', async (req, res) => {
  let collection = await db.collection('records');
  let query = { _id: ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// POST - cria um novo registro
router.post('/', async (req, res) => {
  let newDocument = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  let collection = await db.collection('records');
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// PATCH - atualiza um registro por id
router.patch('/:id', async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };

  let collection = await db.collection('records');
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// DELETE - remove um registro por id
router.delete('/:id', async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection('records');
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});