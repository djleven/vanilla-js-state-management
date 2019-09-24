export default class Score {
    constructor ({
                     totalPossiblePoints = 0,
                     totalAwardedPoints = 0,
                     lastAnswerWasCorrect = false,
                     scoreLevel = null,
                     isGameOver = false
                 } = {}) {
        this.totalPossiblePoints = totalPossiblePoints
        this.totalAwardedPoints = totalAwardedPoints
        this.lastAnswerWasCorrect = lastAnswerWasCorrect
        this.scoreLevel = scoreLevel
        this.isGameOver = isGameOver
    }
}
