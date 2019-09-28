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
        "q_id": 3,
        "title": "Who killed Rickon Stark?",
        "img": "/imgs/3.jpg",
        "question_type": "mutiplechoice-single",
        "possible_answers": [
            {
                "a_id": 7,
                "caption": "Roose Bolton"
            },
            {
                "a_id": 8,
                "caption": "Stannis Baratheon"
            },
            {
                "a_id": 9,
                "caption": "Ramsay Bolton"
            },
            {
                "a_id": 10,
                "caption": "Renley Baratheon"
            }
        ],
        "correct_answer": 9,
        "points": 2
    }

]

const answerToSubmit = 9
const expectedResults = {
    scoreTextBeforeClick: '0 points earned out of a possible 0',
    scoreTextAfterClick: '2 points earned out of a possible 2',
    scorePercentageTextBefore: 'N/A',
    scorePercentageTextAfter: '100.00%'
}
let wrapper
let possibleRenderedAnswers


describe(`Single Multiple Select Correct Answer Evaluation`, () => {

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

                expect(hasAppropriateCorrectAnswerClass(wrapper, true)).toBe(true)

            })

            it(`a valid comment text is displayed`, () => {

                expect(isValidEvaluationCommentRendered(wrapper)).toBe(true)
            })

        })
    })

})
