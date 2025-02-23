import express from 'express'
import * as ws from 'ws'
import path from 'path'
import * as sessions from "./sessions.js"
const app = express()
const port = 3000
const wss = new ws.WebSocketServer({port:8080})
const __dirname = path.resolve()

app.get('/', (req, res) => {
  res.sendFile(page("index"))
})

app.get("/quiz", (req, res) => {
  if ("sessionId" in req.query && req.query.sessionId != "") {
    res.sendFile(page("quiz"))
  } else {
    let sessionId = sessions.createSession(["test1", "test2"], ["test1a", "test2a"])
    res.redirect(`/quiz?sessionId=${sessionId}`)
  }
})

app.get("/scores", (req, res) => {
  res.sendFile(page("scores"))
})

app.get("/questions", (req, res) => {
  if ("sessionId" in req.query && req.query.sessionId != "") {
    let sessionId = req.query.sessionId
    let session = sessions.getSession(sessionId)
    if (session != null) {
      res.send(JSON.stringify(sessions.getSession(req.query.sessionId).questions))
    } else {
      res.send("No Existing Session")
    }
  } else {
    res.send("Need Session Id")
  }
})

app.post("/submit", (req, res) => {
  res.redirect("/scores")
})

app.listen(port, () => {
  console.log(`CapstoneFirstDraft listening at http://localhost:${port}`)
})

wss.on("connection", function open(ws) {
  ws.send("test")
})

function wsBroadcast(data) {
  wss.clients.forEach(client => {
    client.send(data)
  });
}

function page(name) {
  let retVal = __dirname + "/pages/" + name
  if (retVal.endsWith(".html")) {
    return retVal
  } else {
    return retVal + ".html"
  }
}