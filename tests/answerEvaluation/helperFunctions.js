import store from '../../public/js/store/index'
import App from '../../public/js/App'
import {fullBodyHtml} from '../mocks/html'
import {getCorrectAnswerCaptions} from "../../public/js/helpers/misc"
import {
    prefixCommentPool,
    correctAnswerText,
    elementClasses
} from '../../public/js/helpers/constants.js'

export function loadQuestionTestSetup (quizQuestions) {

    store.commit('loadQuestions', quizQuestions)
    store.commit('updateQuestion')
}

export function mountWrapper() {
    document.body.innerHTML =  fullBodyHtml;
    // Instantiate component
    let wrapper = new App()
    // Initial render
    wrapper.init()

    return wrapper
}

export function clickSingleSelectAnswer(answerToSubmit, possibleRenderedAnswers) {

    for (let answer of possibleRenderedAnswers) {

        if (answerToSubmit.toString() === answer.value.toString()) {
            answer.click()
            break
        }
    }

}

export function clickMultipleSelectAnswers(answerToSubmit, possibleRenderedAnswers) {

    for (let answer of possibleRenderedAnswers) {
        if (answerToSubmit.includes(parseInt(answer.value))) {
            answer.click()
        }
    }
}

export function submitSelectedAnswer() {

    document.getElementsByTagName('button')[0].click()
}

export function questionElementTexts(wrapper, index) {

    return wrapper.questionComponent.element.children[index].innerHTML
}

export function answerElementTexts(wrapper, index) {

    return wrapper.answerComponent.element.children[index].innerHTML
}

export function scorePointsElementText(wrapper) {

    return wrapper.scoreComponent.element.children[2].innerHTML
}

export function scorePercentElementText(wrapper) {

    return wrapper.scoreComponent.element.children[1].innerHTML
}

export function getCorrectAnswerText() {

    return `${correctAnswerText} ${getCorrectAnswerCaptions().join(', ')}`
}

export function checkedAnswerLabelHasActiveClass(answer) {

    return answer.parentElement.classList.contains(elementClasses.activeButtonInput)
}

export function hasAppropriateCorrectAnswerClass(wrapper, isCorrectAnswer = true) {

    const appropriateClass = isCorrectAnswer ? elementClasses.correct : elementClasses.incorrect

    return wrapper.answerComponent.element.children[1].classList.contains(appropriateClass)
}

export function isValidEvaluationCommentRendered(wrapper, isCorrectAnswer = true) {

    const evaluation = isCorrectAnswer ? elementClasses.correct : elementClasses.incorrect

    return prefixCommentPool[evaluation].includes(answerElementTexts(wrapper, 0))
}
