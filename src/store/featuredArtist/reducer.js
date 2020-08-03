const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "FEATURED_ARTIST_FETCHED": {
      return {
        featuredArtist: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
