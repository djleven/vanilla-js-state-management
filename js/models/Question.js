const booleanChoices = [
    {
        a_id: false,
        caption: 'False'
    },
    {
        a_id: true,
        caption: 'True'
    },
]

export default class Question {
    constructor ({
                     question_type = '',
                     title = '',
                     q_id = 0,
                     points = 0,
                     correct_answer = null,
                     img = '',
                     possible_answers = booleanChoices
                 } = {}) {
        this.question_type = question_type
        this.title = title
        this.q_id = q_id
        this.points = points
        this.correct_answer = correct_answer
        this.img = img
        this.possible_answers = possible_answers
    }
}
