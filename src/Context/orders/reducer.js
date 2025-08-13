import { initialState } from "./state";

const actionHandlers = {
  GET_ORDERS: (state, action) => ({
    ...state,
    orders: action?.payload,
  }),
  GET_ORDER_DETAILS: (state, action) => ({
    ...state,
    orderDetails: action?.payload,
  }),
  UPDATE_ORDER_STATUS: (state, action) => ({
    ...state,
    orders: state.orders.map((order) =>
      order.id === action?.payload.id ? action?.payload : order
    ),
  }),
  RESET_STATE: () => ({ ...initialState }),
};

const Reducer = (state, action) => {
  const handler = actionHandlers[action?.type];
  return handler ? handler(state, action) : state;
};

export default Reducer;
