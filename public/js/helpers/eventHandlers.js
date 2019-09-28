import store from "../store/index.js";
import { elementClasses } from '../helpers/constants.js'

export const answerEvents = {
    /**
     * Evaluate the answer given, attribute point totals and move to the next question
     *
     * @param event object       onclick event object
     *
     * @returns {void}
     */
    evaluateAnswer(event) {
        const answerGiven = getCheckedCheckboxes()
        let answerIsCorrect = false

        const question = store.state.currentQuestion
        const points = question.points

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
        const question = store.state.currentQuestion
        let singleSelectAnswerValue = null;
        if (question.question_type !== 'mutiplechoice-multiple') {
            singleSelectAnswerValue = event.target.value;
        }
        const answerGiven = getCheckedCheckboxes(singleSelectAnswerValue)
        const submitButton = document.querySelector('button.submit')

        // Set the submit button's disabled property depending on if at least one checkbox is checked or not
        submitButton.disabled = !answerGiven.length

        // Toggle the label / button of the selected checkbox
        event.target.parentElement.classList.toggle(elementClasses.activeButtonInput)
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
 * Get the user's checked checkbox(es)
 *
 * In case of single select, keep only the latest checked checkbox
 *
 * @returns array
 */
function getCheckedCheckboxes (singleSelectLatestAnswer) {
    const checkBoxes = document.getElementsByTagName('input')
    let answerGiven = []

    for (let checkBox of checkBoxes) {

        if (checkBox.checked) {
            // if we're dealing with a single select and this is a previously checked option
            if(singleSelectLatestAnswer && singleSelectLatestAnswer !== checkBox.value) {

                // remove the label's selected class (un-highlight option)
                checkBox.parentElement.classList.toggle(elementClasses.activeButtonInput)

                // uncheck the box
                checkBox.checked = false

                // move to the next checked box
                continue
            }

            // else add it to array of checked boxes
            answerGiven.push(checkBox.value)
        }
    }

    return answerGiven
}
