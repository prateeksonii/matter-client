const INITIAL_STATE = {};

const organizationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_ORGANIZATION":
      return {
        ...state,
        organization: action.payload,
      };
    default:
      return state;
  }
};

export default organizationReducer;
