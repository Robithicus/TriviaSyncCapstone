export class Session {
    constructor(questions, id) {
        this.questions = questions
        this.id = id
        this.wsc = null
    }

    getSessionData() {
        return(new PublicData(this.id, this.questions))
    }
}

class PublicData {
    constructor (sessionId, questions) {
        this.sessionId = sessionId
        this.questions = this.questionsRandom(questions)
    }

    questionsRandom(questions) {
        let publicQuestionsTemp = []
        let publicQuestions = []
        questions.forEach(question => {
            publicQuestionsTemp.push(new QuestionPublic(question.question, question.answer, question.choices, question.category))
        });

        while (publicQuestionsTemp.length > 0) {
            let randomnum = Math.floor(Math.random() * publicQuestionsTemp.length)
            publicQuestions.push(publicQuestionsTemp[randomnum])
            publicQuestionsTemp.splice(randomnum, 1)
        }
        return publicQuestions
    }
}

class QuestionPublic {
    constructor(question, answer, choices, category) {
        this.question = question
        this.category = category
        this.options = this.randomChoices(answer, choices)
    }

    randomChoices(answer, choices) {
        let options = [answer, choices[0], choices[1], choices[2]]
        let randoms = []
        
        while (options.length > 0) {
            let randomnum = Math.floor(Math.random()*options.length)
            randoms.push(options[randomnum])
            options.splice(randomnum, 1)
        }

        return randoms
    }
}

function randomSort() {

}