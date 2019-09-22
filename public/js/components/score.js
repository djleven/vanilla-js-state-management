import Component from '../lib/component.js'
import store from '../store/index.js'

export default class Score extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.points')
        })
    }
    
    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        const pointsEarned = store.state.totalAwardedPoints
        const totalPossiblePoints = store.state.totalPossiblePoints
        const scoreHeaderText = 'You\'ve got'
        const scoreText = 'points earned out of a possible'
        let percentage = 'N/A'

        if(totalPossiblePoints > 0) {
            percentage = `${((pointsEarned / totalPossiblePoints) * 100).toFixed(2)}%`
        }
        this.element.innerHTML =
            `<small class="header">${scoreHeaderText}</small>
             <span>${percentage}</span>
             <small>${pointsEarned} ${scoreText} ${totalPossiblePoints}</small>`

    }
}
