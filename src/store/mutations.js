import * as types from './mutation-types';

const mutations = {
    [types.Set_Singer](state, singer) {
        state.singer = singer;
    }
}

export default mutations;