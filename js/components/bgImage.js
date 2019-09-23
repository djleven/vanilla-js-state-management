import Component from '../lib/component.js'
import store from '../store/index.js'

export default class BgImage extends Component {

    // Pass our store instance and the HTML element up to the parent Component
    constructor() {
        super({
            store,
            element: document.getElementsByTagName('body')[0]
        })
    }

    /**
     * React to state changes and render the component's HTML
     *
     * Render the background image
     * Set body min-height to window size height to minimise chances of getting white space in bg
     *
     * @returns {void}
     */
    render() {
        if (store.state.questions.length) {
            let imgUrl
            if(store.state.score.isGameOver) {
                imgUrl = store.state.results[store.state.score.scoreLevel].img
            } else {
                imgUrl = store.state.currentQuestion.img
            }
            this.element.style.background = `url('${imgUrl}') center center no-repeat`
            this.element.style.backgroundSize = 'cover'
            this.element.style.minHeight = `${store.state.winHeight}px`
        }
    }
}