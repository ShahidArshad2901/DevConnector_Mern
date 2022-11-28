import axios from "axios";
import { setAlert } from "./alert";

import { REGISTER_FAIL, REGISTER_SUCCESS } from "./types";

// Register User

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password });
    console.log(body, "IN auth.js");

    try {
      const res = await axios.post("/api/users", body, config); // axios return promise

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
