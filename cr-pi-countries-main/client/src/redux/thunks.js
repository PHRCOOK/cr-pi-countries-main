import axios from "axios";
import { deleteActivity } from "./actions";

export const deleteActivityThunk = (id) => async (dispatch) => {
  await axios.delete(`/activities/${id}`);
  dispatch(deleteActivity(id));
};
