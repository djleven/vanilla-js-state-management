import {
    loadQuestionTestSetup,
    mountWrapper,
    clickSingleSelectAnswer,
    checkedAnswerLabelHasActiveClass,
    submitSelectedAnswer,
    questionElementTexts,
    answerElementTexts,
    scorePointsElementText,
    scorePercentElementText,
    getCorrectAnswerText,
    hasAppropriateCorrectAnswerClass,
    isValidEvaluationCommentRendered
} from './helperFunctions.js'
import {elementClasses} from "../../public/js/misc/constants";

const quizQuestions = [
    {

        "q_id": 2,

        "title": "The Queen of Thorns, Olenna Tyrell, is the only Tyrell left alive at the end of Season 6.",

        "img": "/imgs/2.jpg",

        "question_type": "truefalse",

        "correct_answer": true,

        "points": 3

    }
]
const booleanPossibleAnswers = [
    {
        a_id: false,
        caption: 'False'
    },
    {
        a_id: true,
        caption: 'True'
    },
]


const answerToSubmit = false
const expectedResults = {
    scoreTextBeforeClick: '0 points earned out of a possible 0',
    scoreTextAfterClick: '0 points earned out of a possible 3',
    scorePercentageTextBefore: 'N/A',
    scorePercentageTextAfter: '0.00%'
}
let wrapper
let possibleRenderedAnswers

describe(`Boolean Select Correct Answer Evaluation`, () => {

    beforeAll(() => {
        // Instantiate component
        wrapper = mountWrapper()

        loadQuestionTestSetup(quizQuestions)

        possibleRenderedAnswers = document.getElementsByTagName('input')
    })

    describe(`Before the question is answered`, () => {

        it(`the correct question is rendered`, () => {

            expect(questionElementTexts(wrapper, 0)).toBe(quizQuestions[0].title)

        })

        it(`the possible answers are rendered correctly`, () => {

            Object.keys(possibleRenderedAnswers).forEach( (answer) => {

                expect(possibleRenderedAnswers[answer].value)
                    .toBe(booleanPossibleAnswers[answer].a_id.toString())

                const parentLabelElement = possibleRenderedAnswers[answer].parentElement

                expect(parentLabelElement.textContent)
                    .toBe(booleanPossibleAnswers[answer].caption)
            })

            expect(possibleRenderedAnswers.length).toBe(2)

        })

        it(`the score texts are accurate`, () => {

            expect(scorePointsElementText(wrapper)).toBe(expectedResults.scoreTextBeforeClick)
            expect(scorePercentElementText(wrapper)).toBe(expectedResults.scorePercentageTextBefore)

        })

    })


    describe(`After the answer is selected`, () => {

        beforeAll(() => {

            clickSingleSelectAnswer(answerToSubmit, possibleRenderedAnswers)
        })

        it(`selected answer input field is checked`, () => {

            for (let answer of possibleRenderedAnswers) {
                if (answer.checked) {

                    expect(answerToSubmit.toString() === answer.value.toString()).toBe(true)

                }
            }
        })

        it(`selected answer input label has active class`, () => {

            for (let answer of possibleRenderedAnswers) {
                if (answer.checked) {

                    expect(checkedAnswerLabelHasActiveClass(answer)).toBe(true)

                }
            }
        })

        it(`the question is still displayed, not the correct answer`, () => {

            expect(questionElementTexts(wrapper, 0)).toBe(quizQuestions[0].title)

        })

        it(`score texts have not yet changed`, () => {

            expect(scorePointsElementText(wrapper)).toBe(expectedResults.scoreTextBeforeClick)
            expect(scorePercentElementText(wrapper)).toBe(expectedResults.scorePercentageTextBefore)

        })

        describe(`After the answers are submitted`, () => {

            beforeAll(() => {
                submitSelectedAnswer()
            })

            it(`score texts are accurate`, () => {

                expect(scorePointsElementText(wrapper)).toBe(expectedResults.scoreTextAfterClick)
                expect(scorePercentElementText(wrapper)).toBe(expectedResults.scorePercentageTextAfter)

            })

            it(`the correct answer text is displayed`, () => {

                expect(answerElementTexts(wrapper, 1)).toBe(getCorrectAnswerText())

            })

            it(`the correct answer text has the appropriate class`, () => {

                expect(hasAppropriateCorrectAnswerClass(wrapper, false)).toBe(true)

            })

            it(`a valid comment text is displayed`, () => {

                expect(isValidEvaluationCommentRendered(wrapper, false)).toBe(true)
            })

        })
    })

})
