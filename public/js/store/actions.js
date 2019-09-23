import { httpRequest, getScorePercentage } from '../helpers.js'

export default {
    getQuestions(context) {
        httpRequest({
            method: 'GET',
            url: 'https://proto.io/en/jobs/candidate-questions/quiz.json'
        })
            .then((data) => {
                data = JSON.parse(data)
                context.commit('loadQuestions', data.questions)
                context.commit('updateQuestion')
                context.commit('loadQuizMeta', {
                    quiz_id: data.quiz_id,
                    title: data.title,
                    description: data.description
                })
            })
            .catch((err) => {
                console.error('Augh, there was an error!', err)
            })
    },
    moveToNextQuestion(context, points) {
        const currentIndex = context.state.currentIndex
        context.commit('updateTotalPossiblePoints', points)
        if( currentIndex + 1 < context.state.questions.length) {
            context.commit('updateIndex')
            context.commit('updateQuestion')
        } else {
            // end game
            // if we already have the results in the store don't request them again (ex: game restarted scenario)
            if(!context.state.results.length) {
                context.dispatch('getEndResult')
            } else {
                context.dispatch('initEvaluation')
            }
        }
    },
    getEndResult(context) {
        httpRequest({
            method: 'GET',
            url: 'https://proto.io/en/jobs/candidate-questions/result.json'
        })
            .then((data) => {
                data = JSON.parse(data)
                context.commit('loadEvaluationResults', data.results)
                context.dispatch('initEvaluation')
            })
            .catch((err) => {
                console.error('Augh, there was an error!', err)
            })
    },
    initEvaluation(context) {
        context.commit(
            'setScoreLevel',
            getScorePercentage()
        )
    },
    restartGame(context) {
        context.commit('updateIndex', true)
        context.commit('updateQuestion')
        context.commit('resetScore')
    }
}
