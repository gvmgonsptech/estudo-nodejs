const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

const app = express();

app.use(express.json());

let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    products = JSON.parse(data);
  }
});

/*
 * POST => INSERIR UM DADO
 * GET => BUSCAR UM OU MAIS DADOS
 * PUT => ALTERAR UM DADO
 * DELETE =>PARA DELETAR UM DADO
 */

/*
 * Body => Sempre que eu quiser enviar dados para a minha aplicação
 * Params => /product/2371235712 (parâmetro de rota)
 * Query => /product?id=361253817625381&value=123671528731 (fazem parte da rota mas não são obrigatórios)
 */

app.post("/products", (req, res) => {
  //Nome e preço => name e price

  const { name, price } = req.body;
  const product = {
    name,
    price,
    id: randomUUID(),
  };

  products.push(product);

  productFile()

  return res.json(product);
});

app.get("/products", (req, res) => {
  return res.json(products);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === id);
  return res.json(product);
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const productIndex = products.findIndex((product) => product.id === id);
  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
  };

  productFile()

  return res.json({ message: "Produto alterado com sucesso" });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex((product) => product.id === id);
  products.splice(productIndex, 1);

  productFile()
  
  return res.json({ message: "Produto removido com sucesso" });
});

function productFile() {
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Produto inserido");
    }
  });
}

app.listen(4002, () => console.log("Servidor está rodando na porta 4002"));
