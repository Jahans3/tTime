/**
 * Created by joshjahans on 15/01/2017.
 */
import store from '../store';
import { APP_ERROR } from '../actions/appActions';

export default class {

    /**
     * Dispatch the current value of an input element
     * @param e
     */
    static dispatchValue(e) {
        const element = e.target;

        if (element.tagName !== 'INPUT') {
            return store.dispatch(
                APP_ERROR('CheckInputValue.dispatchValue: Error: Expects to use an input element.')
            );
        }

        if (!element.id) {
            return store.dispatch(
                APP_ERROR('CheckInputValue.dispatchValue: Error: Input element must have an id.')
            )
        }

        socket.emit(`dispatch-${ element.id }`, element.value);
    }

    /**
     * Generate a standard config, takes an id and an object with a classes to be added when item found/not found
     * @param id
     * @param classes
     * @returns {{id: *, onFound: (function()), onNotFound: (function()), onBlur: (function())}}
     */
    static generateConfig(id, classes) {
        const element = document.getElementById(id);

        return {
            id: id,
            onFound: () => {
                element.classList.add(classes.badInput);
                element.classList.remove(classes.goodInput);
            },
            onNotFound: () => {
                element.classList.add(classes.goodInput);
                element.classList.remove(classes.badInput);
            },
            onBlur: () => {
                if (!element.value.length) {
                    element.classList.remove(classes.goodInput);
                    element.classList.remove(classes.badInput);
                }
            }
        }
    }

    /**
     * Add event listener and subscribe to socket events
     * @param config
     */
    static subscribe(config) {
        const inputId = config.id;
        const input = document.getElementById(inputId);

        if (typeof config.onBlur !== 'function') {
            return store.dispatch(
                APP_ERROR(`CheckInputValue.subscribe: Error: onBlur config option should be a function, got ${ typeof config.onBlur }.`)
            );
        }

        if (typeof config.onFound !== 'function') {
            return store.dispatch(
                APP_ERROR(`CheckInputValue.subscribe: Error: onFound config option should be function, got ${ typeof config.onFound }.`)
            );
        }

        if (typeof config.onNotFound !== 'function') {
            return store.dispatch(
                APP_ERROR(`CheckInputValue.subscribe: Error: onNotFound config option should be function, got ${ typeof config.onNotFound }.`)
            );
        }

        input.addEventListener('blur', config.onBlur);
        socket.on(`${ inputId }-found`, config.onFound);
        socket.on(`${ inputId }-notFound`, config.onNotFound);
    }

    /**
     * Remove listeners and unsubscribe from socket events
     * @param config
     */
    static unsubscribe(config) {
        const inputId = config.id;
        const input = document.getElementById(inputId);

        input.addEventListener('blur', config.onBlur);
        socket.removeListener(`${ inputId }-found`, config.onFound);
        socket.removeListener(`${ inputId }-notFound`, config.onNotFound);
    }
}