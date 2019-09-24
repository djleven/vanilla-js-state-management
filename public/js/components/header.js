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
        let title = 'Welcome to the Game of Thrones Quiz'
        let description = 'If this message persists, you may not have an active internet connection'
        if(store.state.meta.title && store.state.meta.description) {
            title = store.state.meta.title
        }
        if(store.state.meta.description) {
            description = store.state.meta.description
        }
        // Render the header
        this.element.innerHTML =
            `<h1 class="intro__heading">${title}</h1>
             <h4 class="intro__heading">${description}</h4>`
    }
}
