import Component from '../lib/component.js'
import store from '../store/index.js'
import { answerEvents } from '../helpers/eventHandlers.js';

export default class Answers extends Component {

    // Pass our store instance and the HTML element up to the parent Component
    constructor() {
        super({
            store,
            element: document.querySelector('.choices')
        })
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
            element.onclick = answerEvents.toggleCheckboxLabelSelection
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
            element.onclick = answerEvents.evaluateAnswer
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
        if(store.state.score.isGameOver) {
            let button = document.createElement('button')
            button.onclick = answerEvents.restartGame
            button.innerHTML = 'Restart Quiz'
            button.className ='pure-button'
            this.element.appendChild(button)

            return
        }

        if (question.question_type === 'mutiplechoice-multiple') {

            this.generateMultipleSelectionElements()

            // Add a submit button since it's a multiple checkbox selection
            let button = document.createElement('button')
            let div = document.createElement("div")
            div.className ='submit'
            button.onclick = answerEvents.evaluateAnswer
            button.innerHTML = 'Submit'
            button.className ='pure-button'
            div.appendChild(button);
            this.element.appendChild(div)

        } else {
            this.generateSingleSelectionElements()
        }

    }
};
