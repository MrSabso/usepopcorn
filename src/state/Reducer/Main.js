import { mainState } from "../State/Main";



export  function mainReducer(state, action) {
    switch (action.type) {
        case "change":
            return { ...state, [action.propertId]: action.value };
        case "reset":
            return mainState
        default:
            break;
    }
}