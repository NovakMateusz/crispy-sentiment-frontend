export default {
    getUserToken(state) {
        return state.token;
    },
    isAuthenticated(state) {
        return !!state.token;
    }
};