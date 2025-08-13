import { initialState } from "./state";

const actionHandlers = {
  GET_RESTARENT_DETAILS: (state, action) => ({
    ...state,
    restarentDetails: action?.payload,
  }),
  UPDATE_RESTARENT_DETAILS: (state, action) => ({
    ...state,
    restarentDetails: action?.payload,
  }),
  RESET_STATE: () => ({ ...initialState }),
};

const Reducer = (state, action) => {
  const handler = actionHandlers[action?.type];
  return handler ? handler(state, action) : state;
};

export default Reducer;
