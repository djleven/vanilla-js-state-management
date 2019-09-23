import { httpRequest } from '../helpers.js'

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
            context.commit('endGame')
        }
    },
    restartGame(context) {
        context.commit('resetTotalPossiblePoints')
        context.commit('resetTotalAwardedPoints')
        context.commit('updateIndex', true)
        context.commit('updateQuestion')
        context.commit('endGame', false)
    }
}
