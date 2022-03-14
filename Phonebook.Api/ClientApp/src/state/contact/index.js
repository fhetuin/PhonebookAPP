import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import phonebookApi from '../../common/apis/phonebookApi';


export const fetchAsyncContacts = createAsyncThunk('contacts/fetchAsyncContacts', async () => {
  const response = await phonebookApi
  .get("Contact");

  return response.data;
});

export const createAsyncContact = createAsyncThunk('contacts/createAsyncContact', async ({firstName, name, number}) => {
  const contact = {firstName, name, number};
  const response = await phonebookApi
  .post("Contact", contact);

  return response.data;
});

export const updateAsyncContact = createAsyncThunk('contacts/updateAsyncContact', async ({id, firstName, name, number}) => {
  const contact = {id, firstName, name, number};
  const response = await phonebookApi
  .put("Contact/"+ contact.id.toString(), contact)

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
      return "Pending...";
    },
    [fetchAsyncContacts.fulfilled]: (state, action) => {
      console.log("Fetched contacts successfully !")
      return {...state, contacts: action.payload }
    },
    [fetchAsyncContacts.rejected]: () => {
      return "Rejected";
    },
    [updateAsyncContact.pending]: () => {
      return "Pending...";
    },
    [updateAsyncContact.fulfilled]: (state) => {
      console.log("Update product successfully !")
      return {...state};
      
    },
    [updateAsyncContact.rejected]: () => {
      return "Rejected";
    },
    [createAsyncContact.pending]: () => {
      console.log("Pending...");
    },
    [createAsyncContact.fulfilled]: () => {
      console.log("created contact successfully !")

    },
    [createAsyncContact.rejected]: () => {
      console.log("Pending...");

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
export const { setContacts, selectedContact } = contactSlice.actions
