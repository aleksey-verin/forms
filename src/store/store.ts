import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import formSlice from './reducers/formSlice';

export const rootReducer = combineReducers({
  formSlice
});

export const store = configureStore({
  reducer: rootReducer
});

store.subscribe(() => {
  // storageSetItem(storage.isAuth, store.getState().userAuthSlice.isAuth);
  // storageSetItem(storage.userAuth, store.getState().userAuthSlice.user);
  // storageSetItem(storage.searchValue, store.getState().searchValueSlice.search);
  // storageSetItem(storage.searchStoreREST, store.getState().searchRestReposSlice);
  // storageSetItem(storage.searchStoreGraphQL, store.getState().searchGraphQlReposSlice);
  // storageSetItem(storage.settings, store.getState().userSettingsSlice);
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
