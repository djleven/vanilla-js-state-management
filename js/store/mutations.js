import Question from '../models/Question.js'
import Score from '../models/Score.js'

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
        state.score.totalPossiblePoints += payload
    },
    updateTotalAwardedPoints(state, payload) {
        state.score.totalAwardedPoints += payload
    },
    resetScore(state) {
        state.score = Object.assign(state.score, new Score())
    },
    heightResize (state, height) {
        state.winHeight = height
    },
    loadEvaluationResults(state, payload) {
        payload.forEach( (q) => {
            state.results.push(q)
        })
    },
    /**
     * Evaluate the score percentage, commit the score level and end game
     */
    setScoreLevel (state, percentageScore) {
        const lowEndBreakpoint = 33.5
        const highEndBreakpoint = 66.5
        let scoreLevel = null
        percentageScore = parseInt(percentageScore)

        if(percentageScore < lowEndBreakpoint) {
            scoreLevel = 0
        } else if (percentageScore >= lowEndBreakpoint && percentageScore < highEndBreakpoint) {
            scoreLevel = 1
        } else if (percentageScore >= highEndBreakpoint) {
            scoreLevel = 2
        }

        state.score = Object.assign(state.score, { scoreLevel, isGameOver: true })
    }
}
