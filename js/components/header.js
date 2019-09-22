import Component from '../lib/component.js'
import store from '../store/index.js'

export default class Header extends Component {

    // Pass our store instance and the HTML element up to the parent Component
    constructor() {
        super({
            store,
            element: document.querySelector('.intro')
        })
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {

        // Render the header
        this.element.innerHTML =
            `<h1 class="intro__heading">${store.state.meta.title}</h1>
             <h4 class="intro__heading">${store.state.meta.description}</h4>`
    }
}