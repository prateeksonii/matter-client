const INITIAL_STATE = {};

const organizationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_ORGANIZATION":
      return {
        ...state,
        organization: action.payload.organization,
        member: { ...action.payload, organization: undefined, user: undefined },
      };
    default:
      return state;
  }
};

export default organizationReducer;
