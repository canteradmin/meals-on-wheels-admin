import { useReducer } from "react";
import Reducer from "./reducer";
import { Actions } from "./actions";
import axios from "axios";
import { config } from "../../services/config";

export const initialState = {
  supportQueries: [],
};

export const SupportState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const getSupportQueries = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.support}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: Actions.GET_SUPPORT_QUERIES, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateSupportStatus = async (queryId, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${config.support}/${queryId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: Actions.UPDATE_SUPPORT_STATUS,
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    ...state,
    getSupportQueries,
    updateSupportStatus,
  };
};
