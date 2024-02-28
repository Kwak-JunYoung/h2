import { Dispatch, createContext, useEffect, useReducer } from "react";
import { LogonAction, StateType } from "./types/Type";
import axios from "axios";
const initalState = { userid: "", username: "", isLogon: false, callBack: (param: boolean) => { } };

const AppContext = createContext<{ state: StateType, dispatch: Dispatch<LogonAction> }>({
    state: initalState, dispatch: () => null
});

//Reducer 따로 생성 
// 리듀서 함수는 액션에 따라 상태를 업데이트하는 역할을 합니다.
function LogInReducer(state: StateType, action: LogonAction): StateType {

    switch (action.type) {
        case "LOGON":
            let url = "https://jsonplaceholder.typicode.com/users/" + action.value.userid;
            axios.get(url)
                .then(response => {
                    const userData = response.data;
                    const newState = {
                        ...state,
                        userid: userData.id,
                        username: userData.name,
                        isLogon: true
                    };
                    saveStateToLocalStorage("appState", newState);
                    return newState;
                })
                .catch(error => {
                    console.error("로그인에 실패했습니다.", error);
                    // 에러 처리 또는 사용자에게 알리기
                });
            // 이 경우 로그인에 대한 상태 업데이트는 비동기로 이루어집니다.
            // 따라서 리듀서 함수 안에서 직접적으로 새로운 상태를 반환하지 않고,
            // 비동기 작업이 완료된 후에 dispatch를 사용하여 새로운 상태를 전달합니다.
            return state; // 리듀서 함수는 상태를 반환해야 하므로 기본 상태를 반환합니다.

        case "LOGOUT":
            return { ...state, userid: "", username: "", isLogon: false }
        case "RESET":
            return initalState;
        default:
            throw new Error("알수없는 액션입니다.");
    }
}

// 상태와 디스패치 함수를 관리하는 Context 프로바이더 
const AppProvider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(LogInReducer, initalState);

    useEffect(() => {
        saveStateToLocalStorage("appState", state);
        // state가 바뀔때마다 localstorage에 저장
        // const storage = getStateFromLocalStorage("appState");
        // dispatch({ type: "LOGON", value: storage });
    }
        , [state]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}


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


export default AppContext;