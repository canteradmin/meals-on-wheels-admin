import { initialState } from "./state";

const actionHandlers = {
  GET_SUPPORT_QUERIES: (state, action) => ({
    ...state,
    supportQueries: action?.payload,
  }),
  UPDATE_SUPPORT_STATUS: (state, action) => ({
    ...state,
    supportQueries: state.supportQueries.map((query) =>
      query.id === action?.payload.id ? action?.payload : query
    ),
  }),
  RESET_STATE: () => ({ ...initialState }),
};

const Reducer = (state, action) => {
  const handler = actionHandlers[action?.type];
  return handler ? handler(state, action) : state;
};

export default Reducer;
