const state = {
  handler: null,
  seconds: 0,
  minutes: 0,
};

const mutations = {
  SET_HANDLER(state, handler) {
    state.handler = handler;
  },
  SET_SECONDS(state, seconds) {
    state.seconds = Number.parseInt(seconds);
  },
  SET_MINUTES(state, minutes) {
    state.minutes = Number.parseInt(minutes);
  },
};

const actions = {
  setHandler({ commit }, handler) {
    commit('SET_HANDLER', handler);
  },
  setSeconds({ commit }, seconds) {
    commit('SET_SECONDS', seconds);
  },
  setMinutes({ commit }, minutes) {
    commit('SET_MINUTES', minutes);
  },
};

const getters = {
  getHandler: state => state.handler,
  getSeconds: state => state.seconds,
  getMinutes: state => state.minutes,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
