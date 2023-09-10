import {legacy_createStore,combineReducers} from "redux"
import handleNum from "./NumStatus/reducer"

//組合各個模塊的rudecer
const reducers = combineReducers({
    handleNum
})

//創建數據倉庫
const store = legacy_createStore(reducers);

export default store;
