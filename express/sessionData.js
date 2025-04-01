export class Session {
    constructor(questions, answers, id) {
        this.questions = questions
        this.answers = answers
        this.id = id
        this.wsc = null
    }

    getSessionData() {
        return(publicData(this.id, this.questions))
    }
}

class publicData {
    constructor (sessionId, questions) {
        this.sessionId = sessionId
        this.questions = questionsRandom(questions)
    }

    questionsRandom(questions) {
        publicQuestions = []
        questions.forEach(question => {
            publicQuestions.push(new QuestionPublic(question.question, question.answer, question.choices, question.category))
        });
    }
}

class QuestionPublic {
    constructor(question, answer, choices, category) {
        this.question = question
        this.category = category
        this.choices = randomChoices(answer, choices)
    }

    randomChoices(answer, choices) {
        options = [answer, choices[0], choices[1], choices[2]]
        randoms = []
        
        while (options.length > 0) {
            randomnum = Math.floor(Math.random()*options.length)
            randoms.push(options[randomnum])
            options.splice(randomnum, 1)
        }

        return randoms
    }
}