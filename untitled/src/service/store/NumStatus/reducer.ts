import handleNum from "./index";

let reducer = (state={...handleNum.state},action:{type:string})=>{

    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type){
        case handleNum.add1:
            handleNum.actions["add1"](newState,action)
            break;
        case handleNum.add2:
            handleNum.actions["add2"](newState,action)
            break;
        case handleNum.add3:
            handleNum.actions["add3"](newState,action)
            break;
        default:
            break;
    }

    return newState
}
export default reducer