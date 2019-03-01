const state = {
  list: [
    {
      something: '',
      need_time: '',
      used_time: 0,
      start_time: '',
      end_time: '',
    },
  ],
};

const saveMission = list => localStorage.setItem('missions', JSON.stringify(list));

const mutations = {
  SET_MISSION_LIST: (state, list) => {
    state.list = list;
    saveMission(state.list);
  },
  SET_USED_TIME: (state, { index, time }) => {
    state.list[index].used_time = time;
    saveMission(state.list);
  },
  SET_START_TIME: (state, { index, time }) => {
    if (state.list[index].start_time === '') {
      state.list[index].start_time = time;
      saveMission(state.list);
    }
  },
  CLEAR_START_TIME: (state, index) => {
    state.list[index].start_time = '';
    saveMission(state.list);
  },
  SET_END_TIME: (state, { index, time }) => {
    state.list[index].end_time = time;
    saveMission(state.list);
  },
};

const actions = {
  setMissionList: ({ commit }, list) => {
    commit('SET_MISSION_LIST', list);
  },
  setUsedTime: ({ commit }, index, time) => {
    commit('SET_USED_TIME', index, time);
  },
  setStartTime: ({ commit }, index, time) => {
    commit('SET_START_TIME', index, time);
  },
  setEndTime: ({ commit }, index, time) => {
    commit('SET_END_TIME', index, time);
  },
  clearStartTime: ({ commit }, index) => {
    commit('CLEAR_START_TIME', index);
  },
};

const getters = {
  getMissionList: state => state.list,
  getMissionByIndex: state => index => state.list[index],
};

export default {
  state,
  mutations,
  actions,
  getters,
};
