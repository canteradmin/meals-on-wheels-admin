import { useReducer } from "react";
import Reducer from "./reducer";
import { Actions } from "./actions";
import axios from "axios";
import { config } from "../../services/config";

export const initialState = {
  restaurantSettings: null,
};

export const SettingsState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const getRestaurantSettings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.settings}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: Actions.GET_RESTAURANT_SETTINGS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateRestaurantSettings = async (payload) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${config.settings}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: Actions.UPDATE_RESTAURANT_SETTINGS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    ...state,
    getRestaurantSettings,
    updateRestaurantSettings,
  };
};
