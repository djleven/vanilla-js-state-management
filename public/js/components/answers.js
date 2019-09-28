import Component from '../lib/component.js'
import store from '../store/index.js'
import { answerEvents } from '../misc/eventHandlers.js';
import { elementClasses } from '../misc/constants.js'

export default class Answers extends Component {

    // Pass our store instance and the HTML element up to the parent Component
    constructor() {
        super({
            store,
            element: document.querySelector('.choices')
        })
    }

    /**
     * Loop the possible answers and generate a list of selectable elements
     *
     * @returns {void}
     */
    generateSelectionElements () {
        const question = store.state.currentQuestion

        question.possible_answers.forEach((q, index) => {

            let newlabel = document.createElement("label")
            let element = document.createElement('input')
            newlabel.innerHTML = question.possible_answers[index].caption
            newlabel.className = elementClasses.buttonInput
            element.onclick = answerEvents.checkboxSelectionHandler
            element.type = 'checkbox'
            element.style.display = 'none'
            element.value = question.possible_answers[index].a_id
            newlabel.appendChild(element);
            this.element.appendChild(newlabel)
        })
    }

    /**
     * Create a submit button for answering the question
     *
     * @returns {void}
     */
    createSelectionSubmitButton () {
        let button = document.createElement('button')
        let div = document.createElement("div")
        div.className ='submit'
        button.onclick = answerEvents.evaluateAnswer
        button.disabled = true
        button.innerHTML = 'Submit'
        button.className = `submit ${elementClasses.buttonInput} ${elementClasses.activeButtonInput}`
        div.appendChild(button);
        this.element.appendChild(div)
    }

    /**
     * Create a restart quiz button
     *
     * @returns {void}
     */
    createRestartQuizButton () {
        let button = document.createElement('button')
        button.onclick = answerEvents.restartGame
        button.innerHTML = 'Restart Quiz'
        button.className ='pure-button'
        this.element.appendChild(button)
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {

        if (!store.state.questions.length) {
            return
        }

        if (!store.state.currentQuestion.hasOwnProperty('possible_answers')) {
            console.log('Error: missing possible answers')
            return
        }

        this.element.innerHTML = ''

        // If game is over add a button to restart it
        if(store.state.score.isGameOver) {
            this.createRestartQuizButton()

            return
        }
        // Don't show answer options after submission when displaying the answer
        if(!store.state.showCorrectAnswer) {

            this.generateSelectionElements()

            // Add a submit button to move to next question
            this.createSelectionSubmitButton()
        }


    }
};
