import { initialState } from "./state";

const actionHandlers = {
  GET_DASHBOARD_METRICS: (state, action) => ({
    ...state,
    dashboardMetrics: action?.payload,
  }),
  GET_REPORTS: (state, action) => ({
    ...state,
    reports: action?.payload,
  }),
  GET_RECENT_ACTIVITY: (state, action) => ({
    ...state,
    recentActivity: action?.payload,
  }),
  RESET_STATE: () => ({ ...initialState }),
};

const Reducer = (state, action) => {
  const handler = actionHandlers[action?.type];
  return handler ? handler(state, action) : state;
};

export default Reducer;
