import { useReducer } from "react";
import Reducer from "./reducer";
import { Actions } from "./actions";
import axios from "axios";
import { config } from "../../services/config";

export const initialState = {
  currentPlanAddOns: null,
};

export const AuthState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const registerRestaurant = async (payload) => {
    let url = `${config.register}`;
    console.log(url);
    try {
      const response = await axios.post(url, payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const loginRestaurant = async (payload) => {
    try {
      const response = await axios.post(`${config.login}`, payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    ...state,
    registerRestaurant,
    loginRestaurant,
  };
};
