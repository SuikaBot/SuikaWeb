import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { ENDPOINTS } from "../utils/contants/endpoint";
import { setDataUser, setRefreshToken } from "./userSlice";

export const getRefreshToken = () => async (dispatch) => {
  try {
    const response = await axios.get(ENDPOINTS.TOKEN);
    return response.data.refresh_token; // Ensure you're accessing the right property
  } catch (error) {
    console.error(error);
  }
};

export const getDataUser = (accessToken) => async (dispatch) => {
  try {
    const response = await axios.get(ENDPOINTS.ME, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = response.data.data;

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// const userPict = useSelector((state) => state.data?.userPict);
