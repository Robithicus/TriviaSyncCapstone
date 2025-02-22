import * as sessions from "../sessions.js"

let sessionId = sessions.createSession("testData")

console.log(sessionId)
console.log(sessions.getSession(sessionId))