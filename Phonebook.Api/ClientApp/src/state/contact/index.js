import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import phonebookApi from '../../common/apis/phonebookApi';

export const fetchAsyncContacts = createAsyncThunk('contacts/fetchAsyncContacts', async () => {
  const response = await phonebookApi
  .get("Contact");

  console.log("Contacts :", response.data);
  return response.data;
});




const initialState = { contacts: [], selectedContact: {}};

// Slice
export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    selectedContact:(state, action) => {
      state.selectedContact = action.payload;
    }
  },
  extraReducers: {
    [fetchAsyncContacts.pending]: () => {
      console.log("Pending...");
    },
    [fetchAsyncContacts.fulfilled]: (state, action) => {
      console.log("Fetched contacts successfully !")
      return {...state, contacts: action.payload }
    },
    [fetchAsyncContacts.rejected]: () => {
      console.log("Rejected !")
    }
    
  }
});

// Reducers
export default contactSlice.reducer;

// Selectors
export const contactSelector = (state) => state.contacts;
export const getAllContacts = (state) => state.contacts.contacts;
export const getSelectedContact = (state) => state.contacts.selectedContact;

// Actions
export const { setContacts, removeContact, selectedContact } = contactSlice.actions
