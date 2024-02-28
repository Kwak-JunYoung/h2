import { Dispatch, createContext } from "react";
import { LogonAction, StateType } from "./types/Type";
const initalState = { userid: "", username: "", isLogon: false, callBack: (param: boolean) => { } };

const AppContext = createContext<{ state: StateType, dispatch: Dispatch<LogonAction> }>({
    state: initalState, dispatch: () => null
});

export default AppContext;