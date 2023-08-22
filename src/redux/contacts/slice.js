import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Notify } from 'notiflix';

axios.defaults.baseURL = 'https://64e34258bac46e480e787ab6.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/contacts');
      console.log(response);
      if (response.statusText === 'OK') {
        return response.data;
      } else {
        throw new Error();
      }
    } catch (error) {
      return rejectWithValue(
        'Error: An error occurred while fetching contacts'
      );
    }
  }
);

export const addContsct = createAsyncThunk(
  'contacts/addContact',
  async (newContact, { dispatch }) => {
    try {
      const response = await axios.post('/contacts', newContact);
      if (response.statusText === 'Created') {
        dispatch(fetchContacts());
      } else {
        throw new Error();
      }
    } catch (e) {
      Notify.failure('Error: Contact not added');
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { dispatch }) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      if (response.statusText === 'OK') {
        dispatch(fetchContacts());
      } else {
        throw new Error();
      }
    } catch (e) {
      Notify.failure('Error: the contact was not deleted');
    }
  }
);

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending](state, action) {
      state.isLoading = true;
      state.error = null;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addContsct.pending](state) {
      state.isLoading = true;
    },
    [addContsct.fulfilled](state, action) {
      state.isLoading = false;
    },
    [addContsct.rejected](state, action) {
      state.isLoading = false;
    },
    [deleteContact.pending](state) {
      state.isLoading = true;
    },
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
    },
    [deleteContact.rejected](state, action) {
      state.isLoading = false;
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
export const getError = state => state.contacts.error;
export const getIsLoading = state => state.contacts.isLoading;
export const getContacts = state => state.contacts.items;
