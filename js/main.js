import store from './store/index.js'; 
import { handleResize } from './helpers.js';

// Load up components
import BgImage from "./components/bgImage.js";
import Header from "./components/header.js";
import Question from "./components/question.js";
import Answers from "./components/answers.js";
import Score from "./components/score.js";

window.addEventListener('resize', handleResize)
handleResize()

store.dispatch('getQuestions')

// Instantiate components
const bgImageComponent = new BgImage()
const headerComponent = new Header()
const questionComponent = new Question()
const answersComponent = new Answers()
const scoreComponent = new Score()

// Initial renders
bgImageComponent.render();
headerComponent.render();
questionComponent.render();
answersComponent.render();
scoreComponent.render();
