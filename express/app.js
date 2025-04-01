import express from 'express'
import * as ws from 'ws'
import path from 'path'
import { scoreSubmission } from "./score.js"
import * as sessions from "./sessions.js"
import * as database from "./database.js"
const app = express()
const port = 3000
const wss = new ws.WebSocketServer({port:8080})
const __dirname = path.resolve()

app.use(express.json());

app.use(express.static("public"))

// app.get('/', (req, res) => {
//   res.sendFile(page("index"))
// })

// app.get("/quiz", async (req, res) => {
//   if ("sessionId" in req.query && req.query.sessionId != "") {
//     res.sendFile(page("quiz"))
//   } else {
//     let questions = await database.getQuestions("TES", 3)
//     let sessionId = sessions.createSession(questions[0], questions[1])
//     res.redirect(`/quiz?sessionId=${sessionId}`)
//   }
// })

// app.get("/scores", (req, res) => {
//   res.sendFile(page("scores"))
// })

app.get("/questions", async (req, res) => {
  // if ("sessionId" in req.query && req.query.sessionId != "") {
  //   let sessionId = req.query.sessionId
  //   let session = sessions.getSession(sessionId)
  //   if (session != null) {
  //     res.send(JSON.stringify(sessions.getSession(req.query.sessionId).questions))
  //   } else {
  //     res.send("No Existing Session")
  //   }
  // } else {
  //   res.send("Need Session Id")
  // }
  
  let questions = await database.getQuestions()
  let session = sessions.createSession(questions)
  res.send(session.questionsPublic)
})

app.post("/submit", async (req, res) => {
  console.log(req.body)
  const {name, submissions, sessionId} = req.body

  let session = sessions.getSession(sessionId)
  let answers = session.getAnswers()
  console.log(answers)
  let score = scoreSubmission(submissions, answers)

  await database.submitScore(name, score)
  wssBroadcastScores()

  let position = database.getPosition(name, score)
  let data = { score: score, position: position, answers: answers }

  sessions.deleteSession(sessionId)
  res.send(data)
})

app.listen(port, () => {
  console.log(`CapstoneFirstDraft listening at http://localhost:${port}`)
})

wss.on("connection", async function open(ws) {
  ws.send(JSON.stringify(await database.getScores()))
})

async function wssBroadcastScores() {
  let data = JSON.stringify(await database.getScores())
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