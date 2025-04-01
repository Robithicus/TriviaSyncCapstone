export class Session {
    constructor(questions, answers, id) {
        this.questions = questions
        this.answers = answers
        this.id = id
        this.wsc = null
    }
}