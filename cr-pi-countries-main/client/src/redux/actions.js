import axios from "axios";
import { BASE_API_URL, PORT } from "../apiData";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_CONTINENTS = "GET_CONTINENTS";
export const FILTER_CONTINENT = "FILTER_CONTINENT";
export const FILTER_ACTIVITIES = "FILTER_ACTIVITIES";
export const ORDER_ALFABETICO_ASC = "ORDER_ALFABETICO_ASC";
export const ORDER_ALFABETICO_DES = "ORDER_ALFABETICO_DES";
export const ORDER_POPULATION_ASC = "ORDER_POPULATION_ASC";
export const ORDER_POPULATION_DES = "ORDER_POPULATION_DES";
export const RESET_FILTER = "RESET_FILTER";
export const ERROR = "ERROR";
export const RESET_ERROR = "RESET_ERROR";
export const SET_PAGE = "SET_PAGE";

//menejo de errores de las actions
export const handleError = (error) => ({
  type: ERROR,
  payload: error,
});

//hace una request de todos los countries a la api
export const getAllCountries = () => async (dispatch) => {
  const endpoint = `${BASE_API_URL}/countries`;
  try {
    const { data } = await axios(endpoint);
    return dispatch({
      type: GET_ALL_COUNTRIES,
      payload: data,
    });
  } catch (error) {
    return dispatch(handleError(error));
  }
};

//hace una request de todas las activities a la api
export const getActivities = () => async (dispatch) => {
  const endpoint = `${BASE_API_URL}/activities`;
  try {
    const { data } = await axios(endpoint);
    return dispatch({
      type: GET_ACTIVITIES,
      payload: data,
    });
  } catch (error) {
    return dispatch(handleError(error));
  }
};

//haceuna request a la api de los countries que su nombre contenga el criterio de busqueda
export const getCountries = (criterio) => async (dispatch) => {
  try {
    const endpoint = `${BASE_API_URL}/countries?name=${criterio}`;
    const { data } = await axios(endpoint);
    return dispatch({
      type: GET_COUNTRIES,
      payload: data,
    });
  } catch (error) {
    return dispatch(handleError(error));
  }
};
//setea la pagina seleccionada en el estado global
export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page,
  };
};

//restablece el estado de error global
export const resetError = () => {
  return {
    type: RESET_ERROR,
  };
};

//se cargan en el estado global todos los continentes
export const getContinents = () => {
  return {
    type: GET_CONTINENTS,
  };
};

//se aplica el orden alfabetico ascendente/descendente segun criterio
export const orderCountryAlf = (criterio) => {
  if (criterio === "DES") return { type: ORDER_ALFABETICO_DES };
  return { type: ORDER_ALFABETICO_ASC };
};

//se aplica el orden por poblacion ascendente/descendente segun criterio
export const orderCountryPop = (criterio) => {
  if (criterio === "DES") return { type: ORDER_POPULATION_DES };
  return { type: ORDER_POPULATION_ASC };
};

//se aplica el filtro segun continente
export const filterByContinent = (continent) => {
  return {
    type: FILTER_CONTINENT,
    payload: continent,
  };
};

//se aplica el filtro segun actividad
export const filterByActivities = (activity) => {
  return {
    type: FILTER_ACTIVITIES,
    payload: activity,
  };
};

//se aplica el reset de todos los filtros
export const resetFilter = () => {
  return {
    type: RESET_FILTER,
  };
};
