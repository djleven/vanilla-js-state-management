import store from "../store/index.js";

export const answerEvents = {
    /**
     * Evaluate the answer given, attribute point totals and move to the next question
     *
     * @param event object       onclick event object
     *
     * @returns {void}
     */
    evaluateAnswer(event) {
        let answerGiven
        const question = store.state.currentQuestion
        const points = question.points

        if (question.question_type === 'mutiplechoice-multiple') {
            const checkBoxes = document.getElementsByTagName('input')
            answerGiven = []

            for (let checkBox of checkBoxes) {
                if (checkBox.checked) {
                    answerGiven.push(checkBox.value)
                }
            }
            // TODO: Improve validation UI with disabled submit button if none selected instead of alerting
            if (!answerGiven.length) {
                alert('You must select at least one option')
                return
            }

        } else {
            answerGiven = event.target.value
        }
        if (answerGiven.toString() === question.correct_answer.toString()) {
            store.commit('updateTotalAwardedPoints', points)
        }

        store.dispatch('moveToNextQuestion', points)
    },

    /**
     * Toggle the label / button of the selected checkbox
     *
     * @param event object       onclick event object
     *
     * @returns {void}
     */
    toggleCheckboxLabelSelection(event) {

        event.target.parentElement.classList.toggle('pure-button-primary')
    },

    /**
     * Restart the game
     *
     * @returns {void}
     */
    restartGame() {

        store.dispatch('restartGame')
    }
}

export function handleResize () {
    store.commit('heightResize', window.innerHeight)
}