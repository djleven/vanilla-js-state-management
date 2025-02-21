import Score from './Score.js'

export default class Quiz {
    constructor ({
                     questions = [],
                     currentIndex = 0,
                     currentQuestion = null,
                     meta = {},
                     results = [],
                     score = new Score(),
                     showCorrectAnswer = false,
                     winHeight = null
                 } = {}) {
        this.questions = questions
        this.currentIndex = currentIndex
        this.currentQuestion = currentQuestion
        this.meta = meta
        this.results = results
        this.score = score
        this.showCorrectAnswer = showCorrectAnswer
        this.winHeight = winHeight
    }
}
