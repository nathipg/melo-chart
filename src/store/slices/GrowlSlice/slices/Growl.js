// Initial State
const initialState = {
  growls: [],
};

// Reducers
const reducers = {
  addGrowl: (state, action) => {
    state.growls.push(action.payload);
  },
  removeGrowl: (state, action) => {
    state.growls = state.growls.filter(growl => growl.id !== action.payload);
  },
  clearAllGrowls: (state) => {
    state.growls = [];
  },
};

// Selectors
const selectors = {
  selectAllGrowls: (state) => {
    return state.growls.growls;
  },
};

export const Growl = {
  initialState,
  reducers,
  selectors,
};
