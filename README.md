# Trivia Sync Capstone
run `npm install` in project folder to install dependencies `node app.js` to run

### sql/ contains scripts of default test data

## Outline
### app.js
- Main component, this is what gets run, express is here
	- `app.get("/"...` - Base page, displayed when you go to base URL
		- Redirect to the home page or trivia page or whatever makes sense
	- `app.post("/submit"...` - End point for data submission
		- Needs to accept `sessionId`, `name`, `answers[]`
		- Not actual page, just endpoint
	- `app.use(express.static(("public")))` - serves static files in `public` folder
		- Use this for serving home page and about page
- Web Sockets also here
	- `wss.on("connection", function connection(ws) {...` - Register web socket events
	- `ws.on("message"...` - When web socket server gets message
### database.js
- Separate file called by app.js
- contains the methods for interacting with the database
	- `getQuestions(category, amount)` - returns random questions (id, question, answer) from category up to amount requested ('up to' to handle case where there is not enough questions). Only send questions to user, store entire question to session.
	- `submitScore(name, score)` - ~~returns status codes (below).~~ Input name into database, call `nameparse()`, add score to database, don't check for duplicates, just add away, think arcade machine high scores.
		- Status codes **not used** since we don't check for duplicates, kept code documentation anyways in case change occurs
		- `return 0;` - successfully submitted
		- `return 1;` - submitted and updated existing name entry
		- `return -1;` - did not submit because of existing name
		- `return 2;` - name existed, added another score
	- `getScores(limit = 100)` - Gets top 100 entries, can get any number of entries though 
	- `nameParse(name)` - Return name without dangerous symbols in it, we should support Unicode(?), no semicolons, anything else to remove?
		- Private function
		- Remove `;`, `'`, `_`, and `\`
### score.js
- separate file called by app.js
- include functions to trim off optional words (like "The" or "A" at the start)
- check a match by a certain percent rather than exact spelling (allow spelling mistakes)
	- alternate answers?
- `score(submissions[], answers[])` - Return score, call `isCorrect()` for each pair
- `isCorrect(submission, answer)` - Compare submitted answer to answer, call `ansTrim()` to parse submissions
	- Private function
- `ansTrim(submission)` -  Return trimmed parsed submission, answers should already be trimmed and checked manually before going into the database
	- Private function
### sessions.js
- separate file called by app.js
- can web sockets be associated with `sessionId`?
- handles all `sessionId` and data
- `createSession(questionData)` - return `sessionId`, randomly generated integer that does not already exist, sequential counting? Store `sessionId` and `questionData`
	- Should be random to prevent hijacking sessions
	- Random gen, if `sessionId` exists already, add/subtract (random choice) a random number 1-10 and check again
- `getSession(sessionId)` - return `questionData`, or `null` if invalid session
- `deleteSession(sessionId)` - void, remove `sessionId` from list, only call after scoring (after closing web socket, can it be done?)
- `sessions` - private dictionary; key: `sessionId`, value: `questionData`
### sessionData.js
- class file for organizing data
- questions: list of questions
- answers: list of answers
- id: sessionId
- wsc: websocket connection, unused for now

## Database
### Tables
- Scores
	- username (text, not null), score (int, not null)
- Questions
	- id (varchar(7), primary key, not null), question (text, not null), answer (text, not null)
		- id would be based on category and question number (GEOQ999)
			- Geography Question #999, Q acts as a separator between category and question