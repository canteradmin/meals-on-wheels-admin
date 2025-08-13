import { useReducer } from "react";
import Reducer from "./reducer";
import { Actions } from "./actions";
import axios from "axios";
import { config } from "../../services/config";

export const initialState = {
  menuItems: [],
};

export const MenuState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const getMenuItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.menu}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: Actions.GET_MENU_ITEMS, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addMenuItem = async (payload) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${config.menu}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: Actions.ADD_MENU_ITEM,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateMenuItem = async (itemId, payload) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${config.menu}/${itemId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: Actions.UPDATE_MENU_ITEM,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMenuItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${config.menu}/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: Actions.DELETE_MENU_ITEM,
        payload: itemId,
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    ...state,
    getMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
  };
};
