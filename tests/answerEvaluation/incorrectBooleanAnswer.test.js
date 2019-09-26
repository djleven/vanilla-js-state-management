import {
    loadQuestionTestSetup,
    mountWrapper,
    clickSingleSelectAnswer,
    questionElementTexts,
    answerElementTexts,
    scorePointsElementText,
    scorePercentElementText,
    getCorrectAnswerText,
    isValidEvaluationCommentRendered
} from './helperFunctions.js'

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

        possibleRenderedAnswers = document.getElementsByTagName('button')
    })

    describe(`Before the question is answered`, () => {

        it(`the correct question is rendered`, () => {

            expect(questionElementTexts(wrapper, 0)).toBe(quizQuestions[0].title)

        })

        it(`the possible answers are rendered correctly`, () => {

            Object.keys(possibleRenderedAnswers).forEach( (answer) => {

                expect(possibleRenderedAnswers[answer].value)
                    .toBe(booleanPossibleAnswers[answer].a_id.toString())

                expect(possibleRenderedAnswers[answer].innerHTML)
                    .toBe(booleanPossibleAnswers[answer].caption)
            })

            expect(possibleRenderedAnswers.length).toBe(2)

        })

        it(`the score texts are accurate`, () => {

            expect(scorePointsElementText(wrapper)).toBe(expectedResults.scoreTextBeforeClick)
            expect(scorePercentElementText(wrapper)).toBe(expectedResults.scorePercentageTextBefore)

        })

    })

    describe(`After the question is answered`, () => {

        beforeAll(() => {

            clickSingleSelectAnswer(answerToSubmit, possibleRenderedAnswers)

        })

        it(`score texts are accurate`, () => {

            expect(scorePointsElementText(wrapper)).toBe(expectedResults.scoreTextAfterClick)
            expect(scorePercentElementText(wrapper)).toBe(expectedResults.scorePercentageTextAfter)

        })

        it(`the correct answer text is displayed accurately`, () => {

            expect(answerElementTexts(wrapper, 1)).toBe(getCorrectAnswerText())

        })

        it(`a valid comment text is displayed`, () => {

            expect(isValidEvaluationCommentRendered(wrapper, false)).toBe(true)
        })

    })

})
