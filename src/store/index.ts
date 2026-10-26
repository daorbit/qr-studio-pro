import { combineReducers, configureStore, UnknownAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import qrCodesReducer from './slices/qrCodesSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import analyticsReducer from './slices/analyticsSlice';
import qrAnalyticsReducer from './slices/qrAnalyticsSlice';
import statsReducer from './slices/statsSlice';
import adminReducer from './slices/adminSlice';
import workspaceReducer, { resetWorkspaces, workspaceSwitched } from './slices/workspaceSlice';

const appReducer = combineReducers({
  qrCodes: qrCodesReducer,
  auth: authReducer,
  ui: uiReducer,
  analytics: analyticsReducer,
  qrAnalytics: qrAnalyticsReducer,
  stats: statsReducer,
  admin: adminReducer,
  workspace: workspaceReducer,
});

type AppState = ReturnType<typeof appReducer>;

const WORKSPACE_SCOPED: (keyof AppState)[] = ['qrCodes', 'analytics', 'qrAnalytics', 'stats'];

const rootReducer = (state: AppState | undefined, action: UnknownAction): AppState => {
  if (state && (workspaceSwitched.match(action) || resetWorkspaces.match(action))) {
    const cleared = { ...state } as Partial<AppState>;
    WORKSPACE_SCOPED.forEach((key) => delete cleared[key]);
    return appReducer(cleared as AppState, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for use throughout the app
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
