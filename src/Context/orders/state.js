import { useReducer } from "react";
import Reducer from "./reducer";
import { Actions } from "./actions";
import axios from "axios";
import { config } from "../../services/config";

export const initialState = {
  orders: [],
  orderDetails: null,
};

export const OrderState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const getOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.orders}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: Actions.GET_ORDERS, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderDetails = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.orders}/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: Actions.GET_ORDER_DETAILS, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${config.orders}/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: Actions.UPDATE_ORDER_STATUS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    ...state,
    getOrders,
    getOrderDetails,
    updateOrderStatus,
  };
};
