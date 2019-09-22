export default class Quiz {
    constructor ({
                     questions = [],
                     currentIndex = 0,
                     currentQuestion = null,
                     totalPossiblePoints = 0,
                     totalAwardedPoints = 0,
                     isGameOver = false,
                     meta = {},
                     winHeight = null
                 } = {}) {
        this.questions = questions
        this.currentIndex = currentIndex
        this.currentQuestion = currentQuestion
        this.totalPossiblePoints = totalPossiblePoints
        this.totalAwardedPoints = totalAwardedPoints
        this.isGameOver = isGameOver
        this.meta = meta
        this.winHeight = winHeight
    }
}
