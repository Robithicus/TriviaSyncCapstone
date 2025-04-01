import { Session } from "./sessionData.js"

let sessions = new Map() // map is like dictionary

export function createSession(questions) {
    let sessionId = `${getValidId()}`
    let session = new Session(questions, sessionId)
    sessions.set(sessionId, session)
    console.log(`Created Session ${sessionId}`)
    return session
}

export function getSession(sessionId) {
    return sessions.get(sessionId)
}

export function deleteSession(sessionId) {
    sessions.delete(sessionId)
    console.log(`Deleted Session ${sessionId}`)
}

function getValidId() { // ids range from 100000000 to 999999999 (9 digit guarantee, 899,999,999 sessions)
    let sessionId = getId()
    while (sessionId in sessions) { // generate new IDs until there is no conflict
        sessionId = getId()
    }
    return sessionId
}

function getId() {
    return Math.floor(Math.random() * (999999999-100000000)) + 100000000
}