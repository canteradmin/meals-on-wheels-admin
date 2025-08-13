import { useMemo } from "react";
import { AuthState } from "./auth/state";

const useCombineState = () => {
  const authInfo = AuthState();

  return useMemo(() => ({ authInfo }), [authInfo]);
};

export default useCombineState;
