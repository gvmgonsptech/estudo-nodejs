const http = require("http"); // Aqui estou importando o modulo/biblioteca que eu quero importar do Node

http
  // Aqui estou usando uma função para criar um servidor com os parametros de req (requisição/require) e res (responsta/response)
  .createServer((req, res) => {
    // Aqui defino o código da minha resposta que nesse caso é 200 (sucess), junto com o tipo de retorno que eu vou dar para a minha requisição que nesse caso é um bloco em JSON
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    // Aqui estou fazendo uma validação de rotas pelo HTTP nativo do node, onde especifico as rotas, e cada mensagem que irá aparecer de acordo com cada rota
    if (req.url === "/produto") {
      res.end(
        JSON.stringify({
          message: "Rota de produto",
        })
      );
    }

    if (req.url === "/usuario") {
      res.end(
        JSON.stringify({
          message: "Rota de usuário",
        })
      );
    }

    if (req.url === "/") {
      res.end(
        JSON.stringify({
          message: "Qualquer outra rota",
        })
      );
    }

    //Nessa linha estou definindo a resposta que irá aparecer para essa minha requisição, no caso é uma mensagem
    /* res.end("Minha primeira aplicação com NodeJS Puro"); */

    // Nesse caso estou forçando que minha resposta para a requisição seja um JSON
    /* res.end(
      JSON.stringify({
        message: "Minha primeira aplicação com NodeJS Puro",
      })
    ); */
  })

  // o comando listen é utilizado para definir uma porta para poder acessar esse arquivo, e junto uma mensagem no terminal para mostrar que esse listen está sendo executado
  .listen(4001, () => console.log("Servidor está rodando na porta 4001"));
