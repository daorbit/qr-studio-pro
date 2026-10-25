import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { workspaceAPI } from '@/lib/workspaceApi';
import { readStoredWorkspace, writeStoredWorkspace } from '@/lib/storedWorkspace';
import type { Workspace, WorkspaceUpdate } from '@/types/workspace';
import type { RootState } from '@/store';

interface WorkspaceState {
  list: Workspace[];
  activeId: string | null;
  loaded: boolean;
  loading: boolean;
}

const initialState: WorkspaceState = {
  list: [],
  activeId: readStoredWorkspace(),
  loaded: false,
  loading: false,
};

const serverMessage = (error: unknown, fallback: string) =>
  (error as { response?: { data?: { message?: string } } })?.response?.data?.message || fallback;

export const fetchWorkspaces = createAsyncThunk(
  'workspace/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await workspaceAPI.list();
    } catch (error) {
      return rejectWithValue(serverMessage(error, 'Could not load workspaces'));
    }
  },
  { condition: (_, { getState }) => !(getState() as RootState).workspace.loading }
);

export const createWorkspace = createAsyncThunk('workspace/create', async (name: string, { rejectWithValue }) => {
  try {
    return await workspaceAPI.create(name);
  } catch (error) {
    return rejectWithValue(serverMessage(error, 'Could not create the workspace'));
  }
});

export const updateWorkspace = createAsyncThunk('workspace/update', async (data: WorkspaceUpdate, { rejectWithValue }) => {
  try {
    return await workspaceAPI.update(data);
  } catch (error) {
    return rejectWithValue(serverMessage(error, 'Could not save the workspace'));
  }
});

export const deleteWorkspace = createAsyncThunk('workspace/delete', async (_, { getState, rejectWithValue }) => {
  const id = (getState() as RootState).workspace.activeId;
  try {
    await workspaceAPI.remove();
    return id;
  } catch (error) {
    return rejectWithValue(serverMessage(error, 'Could not delete the workspace'));
  }
});

export const leaveWorkspace = createAsyncThunk('workspace/leave', async (_, { getState, rejectWithValue }) => {
  const id = (getState() as RootState).workspace.activeId;
  try {
    await workspaceAPI.leave();
    return id;
  } catch (error) {
    return rejectWithValue(serverMessage(error, 'Could not leave the workspace'));
  }
});

const dropWorkspace = (state: WorkspaceState, id: string | null) => {
  state.list = state.list.filter((w) => w._id !== id);
  state.activeId = null;
  writeStoredWorkspace(null);
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    switched: (state, action: PayloadAction<string>) => {
      state.activeId = action.payload;
      writeStoredWorkspace(action.payload);
    },
    resetWorkspaces: (state) => {
      state.list = [];
      state.activeId = null;
      state.loaded = false;
      writeStoredWorkspace(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaces.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.list = action.payload;
        if (state.activeId && !action.payload.some((w) => w._id === state.activeId)) {
          state.activeId = null;
          writeStoredWorkspace(null);
        }
      })
      .addCase(fetchWorkspaces.rejected, (state) => {
        state.loading = false;
        state.loaded = true;
      })
      .addCase(createWorkspace.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateWorkspace.fulfilled, (state, action) => {
        state.list = state.list.map((w) => (w._id === action.payload._id ? action.payload : w));
      })
      .addCase(deleteWorkspace.fulfilled, (state, action) => dropWorkspace(state, action.payload))
      .addCase(leaveWorkspace.fulfilled, (state, action) => dropWorkspace(state, action.payload));
  },
});

export const { switched: workspaceSwitched, resetWorkspaces } = workspaceSlice.actions;

export const selectWorkspaces = (state: RootState) => state.workspace.list;
export const selectActiveWorkspaceId = (state: RootState) => state.workspace.activeId;
export const selectWorkspacesLoaded = (state: RootState) => state.workspace.loaded;
export const selectActiveWorkspace = (state: RootState) =>
  state.workspace.list.find((w) => w._id === state.workspace.activeId) ?? null;

export default workspaceSlice.reducer;
