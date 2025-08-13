import { initialState } from "./state";

const actionHandlers = {
  GET_MENU_ITEMS: (state, action) => ({
    ...state,
    menuItems: action?.payload,
  }),
  ADD_MENU_ITEM: (state, action) => ({
    ...state,
    menuItems: [...state.menuItems, action?.payload],
  }),
  UPDATE_MENU_ITEM: (state, action) => ({
    ...state,
    menuItems: state.menuItems.map((item) =>
      item.id === action?.payload.id ? action?.payload : item
    ),
  }),
  DELETE_MENU_ITEM: (state, action) => ({
    ...state,
    menuItems: state.menuItems.filter((item) => item.id !== action?.payload),
  }),
  RESET_STATE: () => ({ ...initialState }),
};

const Reducer = (state, action) => {
  const handler = actionHandlers[action?.type];
  return handler ? handler(state, action) : state;
};

export default Reducer;
