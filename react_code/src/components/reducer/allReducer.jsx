import { combineReducers } from "redux";
import { AllRequests, AllMatches } from "./fetchData";

const allReducers = combineReducers({
  allRequests: AllRequests,
  allMatches: AllMatches
});

export default allReducers;
