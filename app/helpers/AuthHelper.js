/**
 * Created by joshjahans on 1/7/2017.
 */
import store from '../store';

export default class {
    static checkAuth(nextState, replace) {
        const state = store.getState();
        const authenticated = state.login.login.authenticated;

        if (!authenticated) {
            replace({
                pathname: '/login',
                state: nextState.location.pathname
            });
        }
    }
}