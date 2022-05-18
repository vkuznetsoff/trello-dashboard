import { ADD_ITEM } from "./actionTypes";

const initState = {
    boards: [
        {
            id: "1",
            items: []
        }
    ]
}



const boardReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return state

        default:
            return state
    }
}

export default boardReducer