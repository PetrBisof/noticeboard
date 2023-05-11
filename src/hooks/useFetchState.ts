export default function useFetchState(states: Array<any>) {
  let state = "";

  // Check if any state is currently fetching
  if (states.some((state) => state.isFetching)) {
    state = "pending";
  }

  // Check if any state has an error
  if (states.some((state) => state.isError)) {
    state = "error";
  }

  // Check if all states have been successfully fetched
  if (states.every((state) => state.isSuccess)) {
    state = "fulfilled";
  }

  return state; // Return the current state
}
