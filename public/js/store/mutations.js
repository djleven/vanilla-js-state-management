import Question from '../models/Question.js'

export default {
    loadQuestions(state, payload) {
        payload.forEach( (q) => {
            state.questions.push(q)
        })
    },
    loadQuizMeta(state, payload) {
        state.meta =
            Object.assign(state.meta, payload)
    },
    updateIndex(state, reset = false) {
        if(reset) {
            state.currentIndex = 0
        } else {
            state.currentIndex++
        }
    },
    updateQuestion(state) {
        // object assign question with it's model to ensure we have all needed properties
        // ex: possible_answers for boolean types
        state.currentQuestion =
            Object.assign(new Question(), state.questions[state.currentIndex])
    },
    updateTotalPossiblePoints(state, payload) {
        state.totalPossiblePoints += payload
    },
    updateTotalAwardedPoints(state, payload) {
        state.totalAwardedPoints += payload
    },
    resetTotalPossiblePoints(state) {
        state.totalPossiblePoints = 0
    },
    resetTotalAwardedPoints(state) {
        state.totalAwardedPoints = 0
    },
    heightResize (state, height) {
        state.winHeight = height
    },
    endGame (state, endGame = true) {
        state.isGameOver = endGame
    }
}
