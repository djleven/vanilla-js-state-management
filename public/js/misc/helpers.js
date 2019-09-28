import store from '../store/index.js';
import { questionTypeLabel } from '../misc/constants.js'

export function httpRequest (payload) {
    return new Promise( (resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open(payload.method, payload.url)
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response)
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                })
            }
        }
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            })
        }
        xhr.send()
    })
}

/**
 * Return the current user score as a two decimal percentage
 *
 * (This is essentially a store getter..)
 *
 * @returns string
 */
export function getScorePercentage () {
    const score = store.state.score

    return ((score.totalAwardedPoints / score.totalPossiblePoints) * 100).toFixed(2)

}

/**
 * Return the correct answer caption(s)
 *
 * @returns array
 */
export function getCorrectAnswerCaptions () {
    const question = store.state.currentQuestion
    let correctAnswer = question.correct_answer

    // convert correctAnswer into array if it's a number or a boolean
    if(typeof correctAnswer === 'number' || typeof correctAnswer === 'boolean'){
        correctAnswer = [correctAnswer]
    }

    let correctAnswers = []

    // loop through the possible answers and gather the correct one(s)
    for (let answer of question.possible_answers) {
        if (correctAnswer.includes(answer.a_id)) {
            correctAnswers.push(answer.caption)
        }
    }

    return correctAnswers
}
/**
 * Get the required app images to preload, and preload them for a smoother user experience.
 *
 * This function will be called from two places in the app's lifecycle:
 *
 * 1-) During the app's initialisation from the getQuestions() request.
 * In this case, the question images will be processed.
 * Also, the loadResultsNext will be true which will then call the getEndResult() request.
 *
 * 2-) After the getEndResult() request is processed successfully.
 * In this case, the results images will be processed.
 * And so the loadResultsNext will be false.
 *
 * @param arrayWithImages array      array object which includes the images to process
 * @param loadResultsNext boolean    whether to call getEndResult() upon preload completion
 *
 * @returns {void}
 */
export function getImagesToPreload (arrayWithImages, loadResultsNext = false) {
    let imageType = 'question'
    let imgsToPreload = []
    // extract images to preload from array object
    arrayWithImages.forEach( (item) => {
        imgsToPreload.push(item.img)
    })
    if(loadResultsNext) {
        imageType = 'results'
    }
    preloadImages(imgsToPreload, () => {
        console.log(`All ${imageType} images were loaded`);
        if(loadResultsNext) {
            console.log(`Proceed to load ${imageType}`);
            store.dispatch('getEndResult')
        }
    });
}

/**
 * Preload images
 *
 * @param urls                     array      array object of image url's to preload
 * @param allImagesLoadedCallback  function   callback function on preload completion
 *
 * @returns string
 */
function preloadImages (urls, allImagesLoadedCallback) {
    let loadedCounter = 0;
    let toBeLoadedNumber = urls.length;
    urls.forEach((url) => {
        preloadImage(url, () => {
            loadedCounter++;
            console.log('Number of loaded images: ' + loadedCounter);
            if(loadedCounter == toBeLoadedNumber){
                allImagesLoadedCallback();
            }
        });
    });
    function preloadImage(url, anImageLoadedCallback){
        let img = new Image();
        img.src = url;
        img.onload = anImageLoadedCallback;
    }
}

/**
 * Return the current question type label
 *
 * @returns string
 */
export function getQuestionTypeLabel () {
    const questionType = store.state.currentQuestion.question_type
    if(questionType === 'mutiplechoice-multiple') {
        return questionTypeLabel.multipleSelect
    }
    if (questionType === 'mutiplechoice-single') {
        return questionTypeLabel.singleSelect
    }
    if(questionType === 'truefalse') {
        return questionTypeLabel.trueFalse
    }

    return ''
}
