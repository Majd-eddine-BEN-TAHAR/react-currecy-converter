import { ACTIONS } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_CURRENCY1_NAME:
      return { ...state, currency1: action.payload.currency };
    case ACTIONS.UPDATE_CURRENCY2_NAME:
      return { ...state, currency2: action.payload.currency };
    case ACTIONS.UPDATE_AMOUNT1:
      return {
        ...state,
        amount1: parseFloat(action.payload.newAmount).toFixed(3),
      };
    case ACTIONS.UPDATE_AMOUNT2:
      return {
        ...state,
        amount2: parseFloat(action.payload.newAmount).toFixed(3),
      };
    default:
      return state;
  }
};
