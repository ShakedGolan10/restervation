import { store } from "./store.ts";
import { LOADING_START, LOADING_DONE, SET_ERROR, END_ERROR, OPEN_SUCCESS_MODAL } from "./system.reducer.ts";


function startLoader() {
    store.dispatch({ type: LOADING_START, })
}

function endLoader() {
    store.dispatch({ type: LOADING_DONE })
}
function setError(errorMsg?: string) {
    store.dispatch({ type: SET_ERROR, payload: errorMsg })
}
function closeError() {
    store.dispatch({ type: END_ERROR })
}
function openSuccessModal(msg?: string) {
    store.dispatch({ type: OPEN_SUCCESS_MODAL, payload: msg })
}

export {openSuccessModal, closeError, setError, endLoader, startLoader}