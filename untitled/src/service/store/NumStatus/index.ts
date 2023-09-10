export default {
    state:{
        num1:0,
        num2:0,
        num3:0
    },
    actions:{
        add1(newState:{num1:number},action:
            {type:string}){
            newState.num1++
        },
        add2(newState:{num2:number},action:
            {type:string}){
            newState.num2++
        },
        add3(newState:{num3:number},action:
            {type:string}){
            newState.num3++
        },

    },
    add1:"add1",
    add2:"add2",
    add3:"add3"
}