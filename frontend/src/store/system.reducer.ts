import { Action } from "redux"

export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_ERROR = 'SET_ERROR'
export const END_ERROR = 'END_ERROR'
export const OPEN_SUCCESS_MODAL = 'OPEN_SUCCESS_MODAL'

interface SystemState {
  isLoading: boolean
  error: string,
  successMsg: string
}
const initialState: SystemState = {
  isLoading: false,
  error: '',
  successMsg: ''
};

interface PayloadAction<T> extends Action<string> {
  payload: T;
}



export function systemReducer(state = initialState, action: PayloadAction<any>) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case SET_ERROR:
      return { ...state, error: action.payload}
    case END_ERROR:
      return { ...state, error: false}
    case OPEN_SUCCESS_MODAL:
      return { ...state, successMsg: action.payload}
    default: return state
  }
}
