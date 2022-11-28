import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuid from "uuid"; // installed

export const setAlert = (msg, alertType) => (dispatch) => {
  // we can do double arrow, because of thunk middleware
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};
