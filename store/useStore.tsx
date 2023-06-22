import { create } from "zustand";
type State = {
  apiMessage: string;
  loading: boolean | null;
  userAccess: boolean | any;
  loggedIn: boolean | any;
  userData: any;
};

type Actions = {
  setApiMessage: (message: State["apiMessage"]) => void;
  setLoading: (message: State["loading"]) => void;
  setUserData: (data: State["userData"]) => void;
  setUserAcess: (access: State["userAccess"]) => void;
  setLoggedIn: (access: State["loggedIn"]) => void;
  resetApiMessage: () => void;
  resetLoadingState: () => void;
};

const getUserAccess = (key: string) => {
  if (typeof window != "undefined") {
    const userAccess = localStorage.getItem(key);
    if (userAccess) {
      return JSON.parse(userAccess || "");
    }
  }
  return false;
};

const useStore = create<State & Actions>((set) => ({
  apiMessage: "",
  loading: false,
  userEmail: "",
  userData: {},
  userAccess: getUserAccess("isLoggedIn"),
  loggedIn: false,
  setApiMessage: (message) => set(() => ({ apiMessage: message })),
  setLoading: (message) => set(() => ({ loading: message })),
  setUserData: (data) => set(() => ({ userData: data })),
  setUserAcess: (access) => set(() => ({ userAccess: access })),
  setLoggedIn: (access) => set(() => ({ loggedIn: access })),
  resetApiMessage: () => set(() => ({ apiMessage: "" })),
  resetLoadingState: () => set(() => ({ loading: false })),
}));

export default useStore;
