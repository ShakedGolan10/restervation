import { createStore, combineReducers, Store } from 'redux'

import { systemReducer } from './system.reducer.ts'

export interface AppStore extends Store {
        systemModule: {
            isLoading: boolean;
            error: string, 
            successMsg: string
        }
} 

const rootReducer = combineReducers({

    systemModule: systemReducer,

})


export const store:AppStore = createStore(rootReducer)
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })



