let sessions = new Map() // map is like dictionary

export function createSession(answers) {
    let sessionId = getValidId()
    sessions.set(sessionId, answers)
    return sessionId
}

export function getSession(sessionId) {
    return sessions.get(sessionId)
}

export function deleteSession(sessionId) {
    sessions.delete(sessionId)
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