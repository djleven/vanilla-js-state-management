import store from './store/index.js'; 
import { handleResize } from './helpers/eventHandlers.js';

// Load up components
import BgImage from "./components/bgImage.js";
import Header from "./components/header.js";
import Question from "./components/question.js";
import Answers from "./components/answers.js";
import Score from "./components/score.js";
import CorrectAnswer from "./components/correctAnswer.js";

window.addEventListener('resize', handleResize)
handleResize()

store.dispatch('getQuestions')

// Instantiate components
const bgImageComponent = new BgImage()
const headerComponent = new Header()
const questionComponent = new Question()
const answersComponent = new Answers()
const scoreComponent = new Score()
const answerComponent = new CorrectAnswer()
// Initial renders
bgImageComponent.render();
headerComponent.render();
questionComponent.render();
answersComponent.render();
scoreComponent.render();
answerComponent.render();
