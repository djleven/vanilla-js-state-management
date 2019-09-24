import { httpRequest, getScorePercentage, getImagesToPreload } from '../helpers/misc.js'

export default {
    getQuestions(context) {
        httpRequest({
            method: 'GET',
            url: 'https://proto.io/en/jobs/candidate-questions/quiz.json'
        })
            .then((data) => {
                data = JSON.parse(data)
                getImagesToPreload(data.questions, true)
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

    moveToNextQuestion(context) {
        const currentIndex = context.state.currentIndex

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
    /**
     * Get request for the results objects
     *
     * This function can be called from two places in the app's lifecycle:
     *
     * 1-) During the app's sequential lifecycle, after the final question, this function would
     * normally be called right before - and as a prerequisite to - the final app stage (which is the
     * quiz score evaluation).
     * In this case, the initEvaluation needed for launching the evaluation stage, will be true.
     *
     *
     * 2-) Under normal circumstances however, it will be called earlier on the lifecycle, from
     * getImagesToPreload():
     * In this case, when getImagesToPreload finishes pre-loading the images for the questions,
     * it then proceeds to load the results objects, so we can then finally also pre-load the
     * results images, for a smoother user experience.
     *
     * In this case the initEvaluation will be false.
     * Finally, when case no2 occurs before case no1, the latter will not be called because the results
     * will already be present in the store.
     *
     * @param context
     * @param initEvaluation boolean
     *
     * @returns {void}
     */
    getEndResult(context, initEvaluation = false) {
        httpRequest({
            method: 'GET',
            url: 'https://proto.io/en/jobs/candidate-questions/result.json'
        })
            .then((data) => {
                data = JSON.parse(data)
                context.commit('loadEvaluationResults', data.results)
                if(initEvaluation) {
                    context.dispatch('initEvaluation')
                } else {
                    getImagesToPreload(data.results)
                }
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
