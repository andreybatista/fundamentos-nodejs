import http from "node:http";

import { json } from "./middlewares/json.js";
import { Database } from "./database.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./ultis/extract-query-params.js";

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

// Stateful / Stateless

// HTTP Status Code


// Query Parameters: URL Stateful => Filtros, Paginação, Não-obrigatório
//localhost:3333/users?userId=1&name=Diego

// Route Parameters: Identificação de recurso
//localhost:3333/users/1

// Request Body: Envio de informações de um formulário (HTTPs) 
//GET localhost:3333/users/1
//DELETE localhost:3333/users/1
//POST localhost:3333/users/1

const server = http.createServer(async (req, res) => {

  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query  ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }


  return res.writeHead(404).end()
});

server.listen("3333");
