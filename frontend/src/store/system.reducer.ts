import { Action } from "redux"

export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const SET_ERROR = 'SET_ERROR'
export const END_ERROR = 'END_ERROR'

interface SystemState {
  isLoading: boolean
  isError: boolean
}
const initialState: SystemState = {
  isLoading: false,
  isError: false
};



export function systemReducer(state = initialState, action:Action) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case SET_ERROR:
      return { ...state, isError: true}
    case END_ERROR:
      return { ...state, isError: false}
    default: return state
  }
}
