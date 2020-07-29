const initialState = {
  museum: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "MUSEUM_BY_ID_FETCHED": {
      return {
        ...state,
        museum: action.payload,
      };
    }
    case "CLEAR_MUSEUM_DETAILS": {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
