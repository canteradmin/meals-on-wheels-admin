import { initialState } from "./state";

const actionHandlers = {
  SEND_NOTIFICATION: (state, action) => ({
    ...state,
    notifications: [...state.notifications, action?.payload],
  }),
  GET_NOTIFICATIONS: (state, action) => ({
    ...state,
    notifications: action?.payload,
  }),
  RESET_STATE: () => ({ ...initialState }),
};

const Reducer = (state, action) => {
  const handler = actionHandlers[action?.type];
  return handler ? handler(state, action) : state;
};

export default Reducer;
