export default class Score {
    constructor ({
                     totalPossiblePoints = 0,
                     totalAwardedPoints = 0,
                     scoreLevel = null,
                     isGameOver = false
                 } = {}) {
        this.totalPossiblePoints = totalPossiblePoints
        this.totalAwardedPoints = totalAwardedPoints
        this.scoreLevel = scoreLevel
        this.isGameOver = isGameOver
    }
}
