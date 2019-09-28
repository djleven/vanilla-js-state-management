import Component from '../lib/component.js'
import store from '../store/index.js'

import { getCorrectAnswerCaptions } from '../helpers/misc.js';
import {
    prefixCommentPool,
    correctAnswerText,
    elementClasses
} from '../helpers/constants.js'

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
    displayCorrectAnswerPrefix (evaluationResult) {

        const preFixComments = prefixCommentPool[evaluationResult]

        this.insertTextNodeElement(
            preFixComments[Math.floor(Math.random() * preFixComments.length)]
        )
    }

    /**
     * Display the correct answer
     *
     * @returns {void}
     */
    displayCorrectAnswer (evaluationResult) {

        let correctAnswer = getCorrectAnswerCaptions().join(", ")

        this.insertTextNodeElement(`${correctAnswerText} ${correctAnswer}`, evaluationResult)
    }

    /**
     * Create an element, append a text node and insert it into the component's mount point
     *
     * @param text          string   text node to append to element
     * @param elementClass  string   html element class
     * @param element       string   html element tag
     * @param insertBefore  boolean  insert element before (true) or after (false)
     *
     * @returns {void}
     */
    insertTextNodeElement (text, elementClass = null, element = 'h3', insertBefore = false) {

        let newElement = document.createElement(element);
        if(elementClass) {
            newElement.className = elementClass
        }
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
            const evaluationResult =
                store.state.score.lastAnswerWasCorrect ? elementClasses.correct : elementClasses.incorrect
            this.displayCorrectAnswerPrefix(evaluationResult)
            this.displayCorrectAnswer(evaluationResult)
        }
    }
}
