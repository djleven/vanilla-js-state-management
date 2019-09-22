import Component from '../lib/component.js'
import store from '../store/index.js'

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
        const pointValueText = 'point question'

        // If there are no questions to show, render the status instead
        if(store.state.questions.length === 0) {
            this.element.innerHTML = `<h2>Sorry, but we can't seem to find any questions! 😢</h2>`
            return
        }

        // If game is over do something
        if(store.state.isGameOver) {
            this.element.innerHTML = `<h2>Game over</h2>`
            return
        }

        // Otherwise, render the question
        this.element.innerHTML =
            `<h2>${store.state.currentQuestion.title}</h2>
             <small>${store.state.currentQuestion.points} ${pointValueText}</small>`
    }
}
