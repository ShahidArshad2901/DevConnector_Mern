import { v4 as uuid } from "uuid"; // installed
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    // we can do double arrow, because of thunk middleware
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
