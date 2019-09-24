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
        let answerIsCorrect = false

        const question = store.state.currentQuestion
        const points = question.points

        if (question.question_type === 'mutiplechoice-multiple') {
            answerGiven = getCheckedCheckboxes()

        } else {
            answerGiven = event.target.value
        }
        // if answer given is correct commit points
        if (answerGiven.toString() === question.correct_answer.toString()) {
            store.commit('updateTotalAwardedPoints', points)
            answerIsCorrect = true
        }
        store.commit('updateTotalPossiblePoints', points)
        store.commit('updateLastAnswerWasCorrect', answerIsCorrect)
        store.commit('toggleShowCorrectAnswer')

        setTimeout(()=> {
            store.commit('toggleShowCorrectAnswer')
            store.dispatch('moveToNextQuestion')
        }, 3000)

    },

    /**
     * Multiple selection checkbox click handler
     *
     * @param event object       onclick event object
     *
     * @returns {void}
     */
    checkboxSelectionHandler(event) {

        const answerGiven = getCheckedCheckboxes()
        const submitButton = document.querySelector('button.submit')

        // Set the submit button's disabled property depending on if at least one checkbox is checked or not
        submitButton.disabled = !answerGiven.length

        // Toggle the label / button of the selected checkbox
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

/**
 * Get the user's checked checkboxes
 *
 * @returns array
 */
function getCheckedCheckboxes () {
    const checkBoxes = document.getElementsByTagName('input')
    let answerGiven = []

    for (let checkBox of checkBoxes) {
        if (checkBox.checked) {
            answerGiven.push(checkBox.value)
        }
    }

    return answerGiven
}
