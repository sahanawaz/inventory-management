import { useCallback } from "react";

export const onRefresh = (
  setRefreshing: (arg0: boolean) => void,
  callback: any
) => {
  setRefreshing(true);
  // Simulate a data fetching operation
  callback();
  setRefreshing(false);
};
