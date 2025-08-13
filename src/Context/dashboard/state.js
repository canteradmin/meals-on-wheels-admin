import { useReducer } from "react";
import Reducer from "./reducer";
import { Actions } from "./actions";
import axios from "axios";
import { config } from "../../services/config";

export const initialState = {
  dashboardMetrics: null,
  reports: [],
  recentActivity: [],
};

export const DashboardState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const getDashboardMetrics = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.dashboard}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: Actions.GET_DASHBOARD_METRICS, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getReports = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.reports}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: Actions.GET_REPORTS, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getRecentActivity = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.activity}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: Actions.GET_RECENT_ACTIVITY, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    ...state,
    getDashboardMetrics,
    getReports,
    getRecentActivity,
  };
};
