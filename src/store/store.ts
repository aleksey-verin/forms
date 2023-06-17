import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import formSlice from './reducers/formData/formSlice';
import { storage, storageSetItem } from '@/utils/storage/storage';

export const rootReducer = combineReducers({
  formSlice
});

export const store = configureStore({
  reducer: rootReducer
});

store.subscribe(() => {
  storageSetItem(storage.formData, store.getState().formSlice.formData);
  storageSetItem(storage.formCurrentStep, store.getState().formSlice.formCurrentStep);
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
