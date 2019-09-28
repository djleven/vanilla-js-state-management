import Component from '../lib/component.js'
import store from '../store/index.js'
import Score from './score.js'
import { getQuestionTypeLabel } from '../misc/helpers.js'

export default class Question extends Component {

    // Pass our store instance and the HTML element up to the parent Component
    constructor() {
        super({
            store,
            element: document.querySelector('.question')
        });
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        // reset component output
        this.element.innerHTML = ''
        // If there are no questions to show, render the status instead
        if(store.state.questions.length === 0) {
            this.element.innerHTML = `<h2>Sorry, but we can't seem to find any questions! 😢</h2>`
            return
        }

        const pointValueText = `point ${getQuestionTypeLabel()} question`
        // If game is over show the evaluation result instead of a question
        // Showcase an example of component reuse - score component (it's a little forced but what the hey)
        if(store.state.score.isGameOver) {
            const scoreComponent = new Score('.question', true)
            scoreComponent.render()
            return
        }

        // Otherwise, render the question
        this.element.innerHTML =
            `<h2>${store.state.currentQuestion.title}</h2>
             <small>${store.state.currentQuestion.points} ${pointValueText}</small>`

    }
}
