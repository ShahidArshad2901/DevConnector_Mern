import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    console.log("We are having error");
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusTest,
        status: error.response.status,
      },
    });
  }
};
