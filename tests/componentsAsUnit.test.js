import { fullBodyHtml } from './mocks/html'
import xhrMock from './mocks/xhrMock'
import BgImage from "../public/js/components/bgImage";
import Score from "../public/js/components/score";
import CorrectAnswer from "../public/js/components/correctAnswer";
import Question from "../public/js/components/question";
import Header from "../public/js/components/header";
import Answers from "../public/js/components/answers";

import store from '../public/js/store/index'
import * as quizResponseObject from './fixtures/quiz.json'

const componentsToTest = {
    BgImage,
    Header,
    Question,
    Answers,
    Score,
    CorrectAnswer
}

let wrapper

function componentTestSetup (componentClassName) {
    document.body.innerHTML = fullBodyHtml
    // Instantiate component
    wrapper = new componentsToTest[componentClassName]()
    // Initial render
    wrapper.render();

    return wrapper
}

function loadQuestionsTestSetup (quizResponse, questionIndex = null) {

    store.commit('loadQuestions', quizResponse.questions)
    if(questionIndex) {
        store.commit('updateIndex', questionIndex)
    }
    store.commit('updateQuestion')
    store.commit('loadQuizMeta', {
        quiz_id: quizResponse.quiz_id,
        title: quizResponse.title,
        description: quizResponse.description
    })
}

describe(`Test components on initial render (initial state)`, () => {

    const componentTestData = {
        BgImage: {},
        Header: {
            textContentOfFirstElement: 'Welcome to the Game of Thrones Quiz',
            textContentOfSecondElement: 'If this message persists, you may not have an active internet connection'
        },
        Question: {
            textContentOfFirstElement: 'Sorry, but we can\'t seem to find any questions! 😢'
        },
        Answers: {},
        Score: {
            textContentOfFirstElement: 'You\'ve got',
            textContentOfSecondElement: 'N/A'
        },
        CorrectAnswer: {}
    }
    
     Object.keys(componentTestData).forEach((componentClassName) => {

        describe(`${componentClassName} base state`, () => {

            beforeAll(() => {

                wrapper = componentTestSetup(componentClassName)
            })

            afterAll(() => {
                document.destroy()
                wrapper.destroy()
            })

            it(`component is an instance of ${componentClassName}`, () => {
                expect(wrapper instanceof componentsToTest[componentClassName]).toBeTruthy()
            })

            if(componentTestData[componentClassName].hasOwnProperty ('textContentOfFirstElement')) {
                it(`text content of first element renders correctly`, () => {

                    const childInnerHTML = wrapper.element.firstChild.textContent

                    expect(childInnerHTML).toBe(componentTestData[componentClassName].textContentOfFirstElement)
                })
            }

            if(componentTestData[componentClassName].hasOwnProperty ('textContentOfSecondElement')) {
                it(`text content of second element renders correctly`, () => {

                    const childInnerHTML = wrapper.element.children[1].textContent

                    expect(childInnerHTML).toBe(componentTestData[componentClassName].textContentOfSecondElement)
                })
            }
        })

    })
})


describe(`Test components after questions loaded`, () => {

    const componentTestData = {
        BgImage: {},
        Header: {
            textContentOfFirstElement: 'Game of Thrones Trivia Quiz: How well do you know Season 6?',
            textContentOfSecondElement: 'All men must die, but not before you prove how much you really love A Song of Ice and Fire.'
        },
        Question: {
            textContentOfFirstElement: 'Who died holding a door for Bran Stark to escape?',
            textContentOfSecondElement: `2 point single selection question`
        },
        Answers: {
            textContentOfFirstElement: 'Hodor',
            textContentOfSecondElement: 'The Hound',
            textContentOfThirdElement: 'Cold Hands',
            textContentOfFourthElement: 'Wun Wun'
        },
        Score: {
            textContentOfFirstElement: 'You\'ve got',
            textContentOfSecondElement: 'N/A',
            textContentOfThirdElement: '0 points earned out of a possible 0'
        },
        CorrectAnswer: {}
    }

    Object.keys(componentTestData).forEach((componentClassName) => {

        describe(`${componentClassName} 1st question state`, () => {

            beforeAll(() => {

                wrapper = componentTestSetup(componentClassName)

                loadQuestionsTestSetup(quizResponseObject)
            })

            afterAll(() => {
                document.destroy()
                wrapper.destroy()
            })

            it(`component is an instance of ${componentClassName}`, () => {
                expect(wrapper instanceof componentsToTest[componentClassName]).toBeTruthy()
            })

            if(componentTestData[componentClassName].hasOwnProperty ('textContentOfFirstElement')) {
                it(`text content of first element renders correctly`, () => {

                    const childInnerHTML = wrapper.element.firstChild.textContent

                    expect(childInnerHTML).toBe(componentTestData[componentClassName].textContentOfFirstElement)
                })
            }

            if(componentTestData[componentClassName].hasOwnProperty ('textContentOfSecondElement')) {
                it(`text content of second element renders correctly`, () => {

                    const childInnerHTML = wrapper.element.children[1].textContent

                    expect(childInnerHTML).toBe(componentTestData[componentClassName].textContentOfSecondElement)
                })
            }

            if(componentTestData[componentClassName].hasOwnProperty ('textContentOfThirdElement')) {
                it(`text content of third element renders correctly`, () => {

                    const childInnerHTML = wrapper.element.children[2].textContent

                    expect(childInnerHTML).toBe(componentTestData[componentClassName].textContentOfThirdElement)
                })
            }

            if(componentTestData[componentClassName].hasOwnProperty ('textContentOfFourthElement')) {
                it(`text content of fourth element renders correctly`, () => {

                    const childInnerHTML = wrapper.element.children[3].textContent

                    expect(childInnerHTML).toBe(componentTestData[componentClassName].textContentOfFourthElement)
                })
            }
        })

    })
})


describe(`Test components after questions loaded 2`, () => {

    const componentTestData = {
        BgImage: {},
        Header: {
            textContentOfFirstElement: 'Game of Thrones Trivia Quiz: How well do you know Season 6?',
            textContentOfSecondElement: 'All men must die, but not before you prove how much you really love A Song of Ice and Fire.'
        },
        Question: {
            textContentOfFirstElement: 'The Queen of Thorns, Olenna Tyrell, is the only Tyrell left alive at the end of Season 6.',
            textContentOfSecondElement: `3 point true / false question`
        },
        Answers: {
            textContentOfFirstElement: 'False',
            textContentOfSecondElement: 'True',
        },
        Score: {
            textContentOfFirstElement: 'You\'ve got',
            textContentOfSecondElement: 'N/A',
            textContentOfThirdElement: '0 points earned out of a possible 0'
        },
        CorrectAnswer: {}
    }

    Object.keys(componentTestData).forEach((componentClassName) => {

        describe(`${componentClassName} 2nd question state`, () => {

            beforeAll(() => {

                wrapper = componentTestSetup(componentClassName)

                loadQuestionsTestSetup(quizResponseObject, 1)

            })

            afterAll(() => {
                document.destroy()
                wrapper.destroy()
            })

            it(`component is an instance of ${componentClassName}`, () => {
                expect(wrapper instanceof componentsToTest[componentClassName]).toBeTruthy()
            })


            if(componentTestData[componentClassName].hasOwnProperty ('textContentOfFirstElement')) {
                it(`text content of first element renders correctly`, () => {

                    const childInnerHTML = wrapper.element.firstChild.textContent

                    expect(childInnerHTML).toBe(componentTestData[componentClassName].textContentOfFirstElement)
                })
            }

            if(componentTestData[componentClassName].hasOwnProperty ('textContentOfSecondElement')) {
                it(`text content of second element renders correctly`, () => {

                    const childInnerHTML = wrapper.element.children[1].textContent

                    expect(childInnerHTML).toBe(componentTestData[componentClassName].textContentOfSecondElement)
                })
            }

            if(componentTestData[componentClassName].hasOwnProperty ('textContentOfThirdElement')) {
                it(`text content of third element renders correctly`, () => {

                    const childInnerHTML = wrapper.element.children[2].textContent

                    expect(childInnerHTML).toBe(componentTestData[componentClassName].textContentOfThirdElement)
                })
            }

            if(componentTestData[componentClassName].hasOwnProperty ('textContentOfFourthElement')) {
                it(`text content of fourth element renders correctly`, () => {

                    const childInnerHTML = wrapper.element.children[3].textContent

                    expect(childInnerHTML).toBe(componentTestData[componentClassName].textContentOfFourthElement)
                })
            }
        })

    })
})

