import axios from "axios";
import { deleteActivity } from "./actions";

//manejo de eliminacion de las actividades

export const deleteActivityThunk = (id) => async (dispatch) => {
  await axios.delete(`/activities/${id}`);
  dispatch(deleteActivity(id));
};
