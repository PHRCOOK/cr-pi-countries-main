import {
  SET_PAGE,
  ERROR,
  RESET_ERROR,
  GET_ALL_COUNTRIES,
  GET_COUNTRIES,
  GET_ACTIVITIES,
  GET_CONTINENTS,
  ORDER_ALFABETICO_ASC,
  ORDER_ALFABETICO_DES,
  ORDER_POPULATION_ASC,
  ORDER_POPULATION_DES,
  FILTER_ACTIVITIES,
  FILTER_CONTINENT,
  RESET_FILTER,
  DELETE_ACTIVITY,
} from "./actions";

const initialState = {
  countries: [],
  sortedCountries: [],
  activities: [],
  continents: [],
  errors: {
    stateError: false,
    error: null,
  },
  pagination: {
    totalPages: 0,
    pageSelect: 1,
    pageCountries: [],
  },
};

//Actualiza los estados del paginado
const updatePagination = (state, pageSelect, sortedCountries) => {
  return {
    ...state.pagination,
    pageSelect: pageSelect,
    totalPages: Math.ceil(sortedCountries.length / 10),
    pageCountries: sortedCountries.slice(pageSelect * 10 - 10, pageSelect * 10),
  };
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    //establece un estado de error global
    case ERROR:
      return {
        ...state,
        errors: {
          stateError: true,
          error: action.payload,
        },
      };

    //reestablece el estado de error global
    case RESET_ERROR:
      return {
        ...state,
        errors: {
          stateError: false,
          error: null,
        },
      };

    //establece todo los paises obtenidos del servidor,establece la cantidad de paginas de 10 elementos y crea la primer pagina y la selecciona
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        sortedCountries: action.payload,
        pagination: updatePagination(state, 1, state.sortedCountries),
      };

    //establece los paises devueltos en la busqueda por nombre , establece la cantidad de paginas y crea la primer pagina y la selecciona
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        sortedCountries: action.payload,
        pagination: updatePagination(state, 1, state.sortedCountries),
      };

    //establece la pagina seleccionada, establece la cantidad de paginas y crea la pagina
    case SET_PAGE:
      return {
        ...state,
        pagination: updatePagination(
          state,
          action.payload,
          state.sortedCountries
        ),
      };

    //establece todas las actividades en el estado gloval obtenidas desde servidor
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    //filtra los continentes de todos los paises , sin repeticiones
    case GET_CONTINENTS:
      return {
        ...state,
        continents: [
          ...new Set([...state.countries].map((country) => country.continent)),
        ],
      };

    //ordena por orden alfavetico ascendente, crea la primer pagina y la selecciona
    case ORDER_ALFABETICO_ASC:
      return {
        ...state,
        countries: [...state.countries],
        sortedCountries: [...state.sortedCountries].sort((country, next) =>
          country.name.localeCompare(next.name)
        ),
        pagination: updatePagination(state, 1, state.sortedCountries),
      };

    //ordena por orden alfavetico descendente, crea la primer pagina y la selecciona
    case ORDER_ALFABETICO_DES:
      return {
        ...state,
        countries: [...state.countries],
        sortedCountries: [...state.sortedCountries].sort((country, next) =>
          next.name.localeCompare(country.name)
        ),
        pagination: updatePagination(state, 1, state.sortedCountries),
      };

    //ordena por poblacion ascendente, crea la primer pagina y la selecciona
    case ORDER_POPULATION_ASC:
      return {
        ...state,
        countries: [...state.countries],
        sortedCountries: [...state.sortedCountries].sort(
          (country, next) => country.population - next.population
        ),
        pagination: updatePagination(state, 1, state.sortedCountries),
      };

    //ordena por poblacion descendente, crea la primer pagina y la selecciona
    case ORDER_POPULATION_DES:
      return {
        ...state,
        countries: [...state.countries],
        sortedCountries: [...state.sortedCountries].sort(
          (country, next) => next.population - country.population
        ),
        pagination: updatePagination(state, 1, state.sortedCountries),
      };

    //filtra por continente, crea la primer pagina y la selecciona
    case FILTER_CONTINENT:
      return {
        ...state,
        countries: [...state.countries],
        sortedCountries: [...state.sortedCountries].filter(
          (country) => country.continent === action.payload
        ),
        pagination: updatePagination(state, 1, state.sortedCountries),
      };

    //filtra por actividades, crea la primer pagina y la selecciona
    case FILTER_ACTIVITIES:
      return {
        ...state,
        countries: [...state.countries],
        sortedCountries: [...state.sortedCountries].filter((country) =>
          country.activities
            .map((activity) => activity.name)
            .includes(action.payload)
        ),
        pagination: updatePagination(state, 1, state.sortedCountries),
      };

    //quita todos los filtros y ordenamientos, crea la primer pagina y la selecciona
    case RESET_FILTER:
      return {
        ...state,
        countries: [...state.countries],
        sortedCountries: [...state.countries],
        pagination: updatePagination(state, 1, state.sortedCountries),
      };
    //Elimina las actividades de la base de datos
    case DELETE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.id !== action.payload
        ),
      };

    default:
      return {
        ...state,
      };
  }
};
