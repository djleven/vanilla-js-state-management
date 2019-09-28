import {
    loadQuestionTestSetup,
    mountWrapper,
    clickMultipleSelectAnswers,
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
import {elementClasses} from "../../public/js/helpers/constants";

const quizQuestions = [
    {
        "q_id": 4,
        "title": "Which of these people died in the Great Sept at Cersei's hand?",
        "img": "/imgs/4.jpg",
        "question_type": "mutiplechoice-multiple",
        "possible_answers": [
            {
                "a_id": 11,
                "caption": "Tommen Baratheon"
            },
            {
                "a_id": 12,
                "caption": "Margery Tyrell"
            },
            {
                "a_id": 13,
                "caption": "Loras Tyrell"
            },
            {
                "a_id": 14,
                "caption": "Mace Tyrell"
            }
        ],
        "correct_answer": [12, 13, 14],
        "points": 4
    }
]

const answerToSubmit = [12, 15]
const expectedResults = {
    scoreTextBeforeClick: '0 points earned out of a possible 0',
    scoreTextAfterClick: '0 points earned out of a possible 4',
    scorePercentageTextBefore: 'N/A',
    scorePercentageTextAfter: '0.00%'
}
let wrapper
let possibleRenderedAnswers

describe(`Multiple Select Incorrect Answer Evaluation`, () => {

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

                expect(parseInt(possibleRenderedAnswers[answer].value))
                    .toBe(quizQuestions[0].possible_answers[answer].a_id)

                const parentLabelElement = possibleRenderedAnswers[answer].parentElement

                expect(parentLabelElement.textContent)
                    .toBe(quizQuestions[0].possible_answers[answer].caption)
            })

            expect(possibleRenderedAnswers.length).toBe(4)

        })

        it(`the score texts are accurate`, () => {

            expect(scorePointsElementText(wrapper)).toBe(expectedResults.scoreTextBeforeClick)
            expect(scorePercentElementText(wrapper)).toBe(expectedResults.scorePercentageTextBefore)

        })

    })

    describe(`After the answers are selected`, () => {

        beforeAll(() => {

            clickMultipleSelectAnswers(answerToSubmit, possibleRenderedAnswers)
        })

        it(`selected answer input fields are checked`, () => {

            for (let answer of possibleRenderedAnswers) {
                if (answer.checked) {

                    expect(answerToSubmit.includes(parseInt(answer.value))).toBe(true)

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
