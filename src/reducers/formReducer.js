import { ADD_FormData, DELETE_FormData } from "../actionTypes/actionTypes";

const initialState = {
  
  Project_id: "12345",
  Project_Name: "xyz",
  Project_Type: "type1",
  Client: "ABCDE",
  AM: "Am1",
  Sample: "400",
  Cost_Per_Interview: "200",
  Setup_fee: "400",
  Operation_team: "400",
  Start_Date: "11/02/2024",
  End_Date: "21/02/2024",
  Other_Cost: '600',
  Translator_Cost: '800',
  Other_Cost_Details: "900", // Additional field for Other Cost Details
  Translator_Cost_Details: "709",
  Advance_payment_required:'true'
  
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