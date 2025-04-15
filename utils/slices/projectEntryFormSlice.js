import { createSlice } from "@reduxjs/toolkit";
const user = localStorage.getItem("user_id");
const initialState = {
  form: {
    name: "",
    project_type: "",
    clients: "",
    sample: "",
    cpi: "",
    set_up_fee: "",
    tentative_start_date: "",
    tentative_end_date: "",
    other_cost: "",
    transaction_fee: "",
    created_by: "",
    project_manager: "",
    operation_select: true,
    finance_select: "",
    upload_document: [],
    project_samples: [],
    is_multiple_sample_cpi: null,
  },
  isOtherCostSelected:false,
  isOtherCostSelectedOptions:[],
  isAddOtherCost: false,
  isAddTranslationCost: false,
  abr: {
    client_name: "", //id
    clientname: "", //name
    client_address: "",
    client_city: "",
    client_country: "",
    project: "",
    contact_person_name: "",
    contact_person_email: "",
    cc_emails: "",
    specific_billing_instruction: "",
    total_project_cost: 0,
    advance_invoice_percentage: "",
    advance_invoice_amount: 0,
    sales_owner: Number(user),
    project_manager: "",
    created_by: Number(user),
    status: "Advanced Billing Raised",
  },
  isAdvancedPayment: false,
  isAdvancedPaymentHasData: false,
};
const projectEntryForm = createSlice({
  name: "projectEntryForm",
  initialState,

  reducers: {
    addFormData: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
    addOtherCost: (state,action) => {
      state.isAddOtherCost = action.payload;
    },
    addTranslationCost: (state,action) => {
      state.isAddTranslationCost = action.payload;
    },
    addAbrData: (state, action) => {
      state.abr = { ...state.abr, ...action.payload };
    },
    toggleAdvancedPayment: (state) => {
      state.isAdvancedPayment = !state.isAdvancedPayment;
    },
    toggleAdvancedPaymentHasData: (state, action) => {
      state.isAdvancedPaymentHasData = action.payload;
    },
    addOtherCostSelected : (state,action)=>{
      state.isOtherCostSelected = action.payload
    },
    addIsOtherCostSelectedOptions : (state,action)=>{
      state.isOtherCostSelectedOptions = action.payload
    },
  },
});
export const {
  addFormData,
  addOtherCost,
  addTranslationCost,
  addAbrData,
  toggleAdvancedPayment,
  toggleAdvancedPaymentHasData,
  addOtherCostSelected,
  addIsOtherCostSelectedOptions
} = projectEntryForm.actions;
export default projectEntryForm.reducer;
