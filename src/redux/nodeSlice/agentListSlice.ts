import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addAgent,
  fetchAgentList,
  fetchAgentsBySearch,
  deleteAgent,
  editAgent, // ✅ new import
} from "../../services/agentFlowServices";

interface Agent {
  id: string;
  name: string;
  // Add other fields if needed
}

interface AgentListState {
  agents: Agent[];
  loading: boolean;
  error: string | null;
}

const initialState: AgentListState = {
  agents: [],
  loading: false,
  error: null,
};

const agentListSlice = createSlice({
  name: "agentList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAgentList.fulfilled,
        (state, action: PayloadAction<Agent[]>) => {
          state.agents = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchAgentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAgent.fulfilled, (state, action: PayloadAction<Agent>) => {
        state.agents.push(action.payload);
        state.loading = false;
      })
      .addCase(addAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchAgentsBySearch.fulfilled,
        (state, action: PayloadAction<Agent[]>) => {
          state.agents = action.payload;
        }
      )
      .addCase(editAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAgent.fulfilled, (state, action: PayloadAction<Agent>) => {
        const index = state.agents.findIndex(
          (agent) => agent.id === action.payload.id
        );
        if (index !== -1) {
          state.agents[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(editAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteAgent.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.agents = state.agents.filter(
            (agent) => agent.id !== action.payload
          );
          state.loading = false;
        }
      )
      .addCase(deleteAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default agentListSlice.reducer;
