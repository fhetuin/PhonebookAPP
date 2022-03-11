import { configureStore, combineReducers } from '@reduxjs/toolkit';

import uiReducer from 'state/ui';
import contactsReducer from 'state/contact';

const rootReducer = combineReducers({
  ui: uiReducer,
  contacts: contactsReducer
});


const store = configureStore({
  reducer: rootReducer,
});

export default store;