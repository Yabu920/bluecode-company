const { createServer } = require("node:http")
const next = require("next")

const dir = __dirname
const app = next({ dev: false, dir })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((request, response) => {
    void handle(request, response).catch(() => {
      if (!response.headersSent) response.statusCode = 500
      if (!response.writableEnded) response.end()
    })
  })
  server.listen(process.env.PORT || 3000)
}).catch((error) => {
  console.error("BlueCode startup failed", error)
  process.exitCode = 1
})
