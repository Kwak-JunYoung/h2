import { Dispatch, createContext, useEffect, useReducer } from "react";
import { LogonAction, StateType } from "./types/Type";

const initalState: StateType = { userid: "", username: "", isLogon: false };

// 리듀서 함수는 액션에 따라 상태를 업데이트하는 역할을 합니다.
function LogInReducer(state: StateType, action: LogonAction): StateType {
    switch (action.type) {
        case "LOGON":
            let newState = { ...state, userid: action.value.userid, username: action.value.username, isLogon: true };
            saveStateToLocalStorage("appState", newState);
            return newState;

        case "LOGOUT":
            let logOutState = { ...state, userid: "", username: "", isLogon: false };
            saveStateToLocalStorage("appState", logOutState);
            return logOutState

        case "RESET":
            return getStateFromLocalStorage("appState");

        default:
            throw new Error("알수없는 액션입니다.");
    }
}

// 상태와 디스패치 함수를 관리하는 Context 프로바이더 
const AppProvider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(LogInReducer, initalState);

    useEffect(() => {
        saveStateToLocalStorage("appState", state);
    }, [state]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

const AppContext = createContext<{ state: StateType, dispatch: Dispatch<LogonAction> }>({
    state: initalState, dispatch: () => null
});

const saveStateToLocalStorage = (key: string, state: StateType) => {
    localStorage.setItem(key, JSON.stringify(state));
}

const getStateFromLocalStorage = (key: string) => {
    const storage = localStorage.getItem(key);
    if (storage) {
        return JSON.parse(storage);
    }
    return initalState;
}


export { AppContext, AppProvider, saveStateToLocalStorage, getStateFromLocalStorage };