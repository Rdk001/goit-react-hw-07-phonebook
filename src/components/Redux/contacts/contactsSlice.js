import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

export const phoneBookSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    onFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]({ isLoading }) {
      isLoading = true;
    },
    [addContact.pending]({ isLoading }) {
      isLoading = true;
    },
    [deleteContact.pending]({ isLoading }) {
      isLoading = true;
    },
    [fetchContacts.fulfilled](state, { payload }) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = payload;
    },
    [addContact.fulfilled](state, { payload }) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items.push(payload);
    },
    [deleteContact.fulfilled](state, { payload }) {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      const index = state.contacts.items.findIndex(
        task => task.id === payload.id
      );
      state.contacts.items.splice(index, 1);
    },
    [fetchContacts.rejected]({ error, isLoading }, { payload }) {
      isLoading = false;
      error = payload;
    },
    [addContact.rejected]({ error, isLoading }, { payload }) {
      isLoading = false;
      error = payload;
    },
    [deleteContact.rejected]({ error, isLoading }, { payload }) {
      isLoading = false;
      error = payload;
    },
  },
});

export const { onFilter } = phoneBookSlice.actions;
export const contactsReducer = phoneBookSlice.reducer;
