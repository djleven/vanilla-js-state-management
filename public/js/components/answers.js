import Component from '../lib/component.js'
import store from '../store/index.js'

export default class Answers extends Component {

    // Pass our store instance and the HTML element up to the parent Component
    constructor() {
        super({
            store,
            element: document.querySelector('.choices')
        })
    }

    /**
     * Evaluate the answer given, attribute point totals and move to the next question
     *
     * @param event object       onclick event object
     *
     * @returns {void}
     */
    evaluateAnswer (event) {
        let answerGiven
        const question = store.state.currentQuestion
        const points = question.points

        if (question.question_type === 'mutiplechoice-multiple') {
            const checkBoxes = document.getElementsByTagName('input')
            answerGiven = []

            for (let checkBox of checkBoxes) {
                if(checkBox.checked) {
                    answerGiven.push(checkBox.value)
                }
            }
            // TODO: Improve validation UI with disabled submit button if none selected instead of alerting
            if(!answerGiven.length) {
                alert('You must select at least one option')
                return
            }

        } else {
            answerGiven = event.target.value
        }
        if(answerGiven.toString() === question.correct_answer.toString()) {
            store.commit('updateTotalAwardedPoints', points)
        }

        store.dispatch('moveToNextQuestion', points)
    }

    /**
     * Toggle the label / button of the selected checkbox
     *
     * @param event object       onclick event object
     *
     * @returns {void}
     */
    toggleCheckboxLabelSelection (event) {

        event.target.parentElement.classList.toggle('pure-button-primary')
    }

    /**
     * Restart the game
     *
     * @returns {void}
     */
    restartGame () {

        store.dispatch('restartGame')
    }

    /**
     * Loop the possible answers and generate a list of multiple selectable elements
     *
     * @returns {void}
     */
    generateMultipleSelectionElements () {
        const question = store.state.currentQuestion

        question.possible_answers.forEach((q, index) => {

            let newlabel = document.createElement("label")
            let element = document.createElement('input')
            newlabel.innerHTML = question.possible_answers[index].caption
            newlabel.className ='pure-button'
            element.onclick = this.toggleCheckboxLabelSelection
            element.type = 'checkbox'
            element.style.display = 'none'
            element.value = question.possible_answers[index].a_id
            newlabel.appendChild(element);
            this.element.appendChild(newlabel)
        })
    }
    /**
     * Loop the possible answers and generate a list of single selectable elements
     *
     * @returns {void}
     */
    generateSingleSelectionElements () {
        const question = store.state.currentQuestion

        question.possible_answers.forEach((q, index) => {
            let element = document.createElement('button');
            element.onclick = this.evaluateAnswer
            element.className ='pure-button'
            element.innerHTML = question.possible_answers[index].caption
            element.value = question.possible_answers[index].a_id
            this.element.appendChild(element)
        })
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        const question = store.state.currentQuestion

        if (!store.state.questions.length) {
            return
        }

        if (!question.hasOwnProperty('possible_answers')) {
            console.log('Error: missing possible answers')
            return
        }

        this.element.innerHTML = ''

        // If game is over add a button to restart it
        if(store.state.isGameOver) {
            let button = document.createElement('button')
            button.onclick = this.restartGame
            button.innerHTML = 'Restart Quiz'
            button.className ='pure-button'
            this.element.appendChild(button)

            return
        }

        if (question.question_type === 'mutiplechoice-multiple') {

            this.generateMultipleSelectionElements()

            let button = document.createElement('button')
            let div = document.createElement("div")
            div.className ='submit'
            button.onclick = this.evaluateAnswer
            button.innerHTML = 'Submit'
            button.className ='pure-button'
            div.appendChild(button);
            this.element.appendChild(div)

        } else {
            this.generateSingleSelectionElements()
        }

    }
};
