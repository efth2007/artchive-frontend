const initialState = {
  artist: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ARTIST_BY_ID_FETCHED": {
      return {
        ...state,
        artist: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
