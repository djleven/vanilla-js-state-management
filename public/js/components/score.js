import Component from '../lib/component.js'
import store from '../store/index.js'
import { getScorePercentage } from '../misc/helpers.js'

export default class Score extends Component {
    constructor(mountToClass = '.points', renderWithEvaluation = false) {
        super({
            store,
            element: document.querySelector(mountToClass)
        })

        this.renderWithEvaluation = renderWithEvaluation
    }

    /**
     * Create the evaluation output
     *
     * @returns string
     */
    evaluationOutput () {

        const result = store.state.results[store.state.score.scoreLevel]

        return `<h2>${result.title}</h2>
                <h3>${result.message}</h3>`
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        const pointsEarned = store.state.score.totalAwardedPoints
        const totalPossiblePoints = store.state.score.totalPossiblePoints
        const scoreHeaderText = 'You\'ve got'
        const scoreText = 'points earned out of a possible'
        let percentage = 'N/A'
        let percentageSuffix = ''

        if(totalPossiblePoints > 0) {
            percentage = getScorePercentage()
            percentageSuffix = '%'
        }

        const scoreBoxOutput =
            `<small class="header">${scoreHeaderText}</small>
             <span>${percentage}${percentageSuffix}</span>
             <small>${pointsEarned} ${scoreText} ${totalPossiblePoints}</small>`

        if(this.renderWithEvaluation) {
            if(store.state.score.isGameOver) {
                this.element.innerHTML = this.evaluationOutput().concat(scoreBoxOutput)
            }

            return
        }

        this.element.innerHTML = scoreBoxOutput
    }
}
