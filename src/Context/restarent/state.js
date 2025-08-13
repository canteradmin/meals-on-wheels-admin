import { useReducer } from "react";
import Reducer from "./reducer";
import { Actions } from "./actions";
import axios from "axios";
import { config } from "../../services/config";

export const initialState = {
  restarentDetails: null,
};

export const AuthState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const getRestarentDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.restarent}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: Actions.GET_RESTARENT_DETAILS, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateRestarentDetails = async (payload) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${config.restarent}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: Actions.UPDATE_RESTARENT_DETAILS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    ...state,
    getRestarentDetails,
    updateRestarentDetails,
  };
};
