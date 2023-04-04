import http from "node:http";

import { json } from "./middlewares/json.js";
import { Database } from "./database.js";
import { routes } from "./routes.js";

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// Stateful / Stateless

// HTTP Status Code

const server = http.createServer(async (req, res) => {

  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path === url
  })

  if(route) {
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
});

server.listen("3333");
