import { store } from "./store.ts";
import { LOADING_START, LOADING_DONE, SET_ERROR, END_ERROR } from "./system.reducer.ts";



export function startLoader() {
    store.dispatch({ type: LOADING_START, })
}

export function endLoader() {
    store.dispatch({ type: LOADING_DONE })
}
export function setError() {
    store.dispatch({ type: SET_ERROR })
}
export function closeError() {
    store.dispatch({ type: END_ERROR })
}