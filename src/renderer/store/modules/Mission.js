const state = {
  list: [
    {
      something: '',
      need_time: '',
      index: 1,
      used_time: 0,
    },
  ],
};

const mutations = {
  SET_MISSION_LIST(state, list) {
    state.list = list;
  },
};

const actions = {
  setMissionList({ commit }, list) {
    localStorage.setItem('missions', JSON.stringify(list));
    commit('SET_MISSION_LIST', list);
  },
};

const getters = {
  getMissionList: state => state.list,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
