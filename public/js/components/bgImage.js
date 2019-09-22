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
     * Set body min-height to window size height to ensure we don't get any white space in bg
     *
     * @returns {void}
     */
    render() {
        if (store.state.questions.length) {
            this.element.style.background = `url('${store.state.currentQuestion.img}') center center no-repeat`
            this.element.style.backgroundSize = 'cover'
            this.element.style.minHeight = `${store.state.winHeight}px`
        }
    }
}