import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";
import { Navigate } from "react-router-dom";

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

// Create or update Profile

export const createProfile =
  (formData, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // const navigation = useNavigation();
      const res = await axios.post("/api/profile", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      if (!edit) {
        console.log("We are here to create");
        return <Navigate to="/dashboard" />;
        // navigation.navigate("/dashboard");
      }
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusTest,
          status: error.response.status,
        },
      });
    }
  };
