import { initialState } from "./state";

const actionHandlers = {
  GET_RESTAURANT_SETTINGS: (state, action) => ({
    ...state,
    restaurantSettings: action?.payload,
  }),
  UPDATE_RESTAURANT_SETTINGS: (state, action) => ({
    ...state,
    restaurantSettings: action?.payload,
  }),
  RESET_STATE: () => ({ ...initialState }),
};

const Reducer = (state, action) => {
  const handler = actionHandlers[action?.type];
  return handler ? handler(state, action) : state;
};

export default Reducer;
