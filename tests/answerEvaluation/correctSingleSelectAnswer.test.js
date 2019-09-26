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

        possibleRenderedAnswers = document.getElementsByTagName('button')
    })

    describe(`Before the question is answered`, () => {

        it(`the correct question is rendered`, () => {

            expect(questionElementTexts(wrapper, 0)).toBe(quizQuestions[0].title)

        })

        it(`the possible answers are rendered correctly`, () => {

        Object.keys(possibleRenderedAnswers).forEach( (answer) => {

            expect(parseInt(possibleRenderedAnswers[answer].value))
                .toBe(quizQuestions[0].possible_answers[answer].a_id)

            expect(possibleRenderedAnswers[answer].innerHTML)
                .toBe(quizQuestions[0].possible_answers[answer].caption)
        })

        expect(possibleRenderedAnswers.length).toBe(4)

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

            expect(isValidEvaluationCommentRendered(wrapper)).toBe(true)
        })

    })

})
