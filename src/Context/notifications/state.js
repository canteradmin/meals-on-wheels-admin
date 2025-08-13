import { useReducer } from "react";
import Reducer from "./reducer";
import { Actions } from "./actions";
import axios from "axios";
import { config } from "../../services/config";

export const initialState = {
  notifications: [],
};

export const NotificationState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const sendNotification = async (payload) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${config.notifications}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: Actions.SEND_NOTIFICATION,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.notifications}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: Actions.GET_NOTIFICATIONS, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    ...state,
    sendNotification,
    getNotifications,
  };
};
