# Trivia Sync Capstone
run `npm install` in project folder to install dependencies `node app.js` to run

### sql/ contains scripts of default test data
### Currently only implemented displaying questions from database

## Outline
### app.js
- Main component, this is what gets run, express is here
### database.js
- Separate file called by app.js
- contains the methods for interacting with the database
### score.js
- separate file called by app.js
- include functions to trim off optional words (like "The" or "A" at the start)
- check a match by a certain percent rather than exact spelling (allow spelling mistakes)
	- alternate answers?

## Database
### Tables
- Scores
	- name (varchar(255), key, not null), score (int, not null)
- Questions
	- id (varchar(7), primary key, not null), question (text, not null), answer (text, not null)
		- id would be based on category and question number (GEOQ999)
			- Geography Question #999, Q acts as a separator between category and question