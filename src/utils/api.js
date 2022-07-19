import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer } from "./_DATA";

class API {
    getInitialData() {
        return Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => ({
            users,
            questions
        }));
    }
    saveQuestionAnswer({ authedUser, qid, answer }) {
        return _saveQuestionAnswer({ authedUser, qid, answer });
    }
    saveQuestion(question) {
        return _saveQuestion(question);
    }
}

export default API = new API();