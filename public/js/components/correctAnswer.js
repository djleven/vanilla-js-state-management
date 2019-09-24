import Component from '../lib/component.js'
import store from '../store/index.js'

import { getCorrectAnswerCaptions } from '../helpers/misc.js';

export default class CorrectAnswer extends Component {

    // Pass our store instance and the HTML element up to the parent Component
    constructor() {
        super({
            store,
            element: document.querySelector('.correct-answer')
        });
    }

    /**
     * Display the correct answer prefix
     *
     * @returns {void}
     */
    displayCorrectAnswerPrefix () {

        let preFixComments
        if(store.state.score.lastAnswerWasCorrect) {
            preFixComments = [
                'Nice Job!', 'Well Done!', 'Looking sharp!', 'Right on!', 'Yup, you got it!',
                'You really know your stuff!', 'That\'s correct!', 'Good Answer!'
            ]
        } else {
            preFixComments = [
                'Nope, wrong answer', 'No, that\'s not it', 'You\'re going to have to do better',
                'Sadly, no', 'Are you sure you\'ve seen this show?', 'No, try again', 'Wrong, wrong'
            ]
        }

        this.insertTextNodeElement(
            preFixComments[Math.floor(Math.random() * preFixComments.length)]
        )
    }

    /**
     * Display the correct answer
     *
     * @returns {void}
     */
    displayCorrectAnswer () {
        let correctAnswer = getCorrectAnswerCaptions().join(", ")
        const answerText = 'The correct answer is'

        this.insertTextNodeElement(`${answerText} ${correctAnswer}`)
    }

    /**
     * Create an element, append a text node and insert it into the component's mount point
     *
     * @returns {void}
     */
    insertTextNodeElement (text, element = 'h3', insertBefore = false) {

        let newElement = document.createElement(element);
        text = document.createTextNode(text);
        newElement.appendChild(text);

        if(insertBefore) {
            this.element.insertBefore(newElement, this.element.childNodes[0])
        } else {
            this.element.insertBefore(newElement, this.nextSibling)
        }

    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        // reset component output
        this.element.innerHTML = ''
        // Show the correct answer after submission (during the brief showCorrectAnswer time frame)
        if(store.state.showCorrectAnswer) {
            this.displayCorrectAnswerPrefix()
            this.displayCorrectAnswer()
        }
    }
}
