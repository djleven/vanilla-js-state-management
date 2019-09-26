import Component from '../lib/component.js'
import store from '../store/index.js'

import { getCorrectAnswerCaptions } from '../helpers/misc.js';
import { prefixCommentPool, correctAnswerText } from '../helpers/constants.js'


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
            preFixComments = prefixCommentPool.correct
        } else {
            preFixComments =prefixCommentPool.incorrect
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

        this.insertTextNodeElement(`${correctAnswerText} ${correctAnswer}`)
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
