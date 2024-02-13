import { configureStore } from '@reduxjs/toolkit';
import { formReducer } from "./reducers/formReducer";

const store = configureStore(formReducer);

export default store;