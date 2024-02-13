import { ADD_FormData, DELETE_FormData } from "../actionTypes/actionTypes";

const initialState = {
  numOfFormData: 0,
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FormData:
      return {
        ...state,
        numOfFormData: state.numOfFormData + 1,
      };

    case DELETE_FormData:
      return {
        ...state,
        numOfFormData: state.numOfFormData - 1,
      };
    default:
      return state;
  }
};