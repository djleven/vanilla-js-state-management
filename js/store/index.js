import Store from '../lib/store.js';
import Quiz from '../models/Quiz.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default new Store({
    actions,
    mutations,
    state: new Quiz(),
});
