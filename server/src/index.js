const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');

const app = express();
app.use(cors())
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
const port = 3000;
mongoose.connect('mongodb+srv://dev:24159@ranek.ldt1j8c.mongodb.net/?retryWrites=true&w=majority&appName=Ranek');

const Produto = mongoose.model('Produto', {
  id: String,
  nome: String,
  usuario_id: String,
  preco: String,
  vendido: Boolean,
  descricao: String,
  imagem: String,
});

app.get('/produtos', async (req, res) => {
  const produtos = await Produto.find()
  res.send(produtos)
});

app.get('/produto/:id', async (req, res) => {
  const produto = await Produto.findOne({ id: req.params.id });
  if (produto) {
    res.send(produto);
  } else {
    res.status(404).send('Produto não encontrado');
  }
});

app.post('/cadastraProduto', async (req, res) => {
  const produto = new Produto({
    id: req.body.id,
    nome: req.body.nome,
    usuario_id: req.body.usuario_id,
    preco: req.body.preco,
    vendido: req.body.vendido,
    descricao: req.body.descricao,
    imagem: req.body.imagem,
  });
  await produto.save();
  res.send(produto);
});

app.put('/updateProduto/:id', async (req, res) => {
  const produto = await Produto.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  if (produto) {
    res.send(produto);
  } else {
    res.status(404).send('Produto não encontrado');
  }
});

app.delete('/deleteProduto/:id', async (req, res) => {
  const produto = await Produto.findOneAndDelete({ id: req.params.id });
  if (produto) {
    res.send(produto);
  } else {
    res.status(404).send('Produto não encontrado');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
