import store from '../store/index.js';

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

// This is essentially a store getter..
export function getScorePercentage () {
    const score = store.state.score

    return ((score.totalAwardedPoints / score.totalPossiblePoints) * 100).toFixed(2)

}
