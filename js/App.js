import store from './store/index.js';
import { handleResize } from './misc/eventHandlers.js';

import BgImage from "./components/bgImage.js";
import Header from "./components/header.js";
import Question from "./components/question.js";
import Answers from "./components/answers.js";
import Score from "./components/score.js";
import CorrectAnswer from "./components/correctAnswer.js";

export default class App {

    constructor() {
        // Instantiate components
        this.bgImageComponent = new BgImage()
        this.headerComponent = new Header()
        this.questionComponent = new Question()
        this.answersComponent = new Answers()
        this.scoreComponent = new Score()
        this.answerComponent = new CorrectAnswer()
    }
    /**
     * Render the components and initialise app
     *
     * @returns {void}
     */
    init () {
        window.addEventListener('resize', handleResize)
        handleResize()

        store.dispatch('getQuestions')

        // Initial renders
        this.bgImageComponent.render();
        this.headerComponent.render();
        this.questionComponent.render();
        this.answersComponent.render();
        this.scoreComponent.render();
        this.answerComponent.render();
    }
}
