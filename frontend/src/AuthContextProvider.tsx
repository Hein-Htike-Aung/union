import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN, USER } from "./constants";
import { useUserStore } from "./store/user.store";
import { getUserFromLocalStorage } from "./utils";

interface ContextProps {
  children: JSX.Element;
}

export interface IAuthContext {
  user: User | null;
  logout: () => void;
  getUserFromLocalStorage: () => User;
  login: (user: User) => void;
}

const AuthContext = createContext({} as IAuthContext);

const AuthContextProvider = ({ children }: ContextProps) => {
  //#region ----- states
  const navigate = useNavigate();
  const { user, updateUser } = useUserStore();

  //#region ----- functions
  function logout() {
    updateUser(null);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    navigate(`/`);
  }

  function login(user: User) {
    updateUser(user);
  }

  //#region ----- life cycle method
  useEffect(() => {
    const userObject = getUserFromLocalStorage();
    if (Object.keys(userObject).length > 0) {
      updateUser(userObject);
    }
    return () => {};
  }, [updateUser]);

  return (
    <AuthContext.Provider
      value={{
        logout,
        login,
        user,
        getUserFromLocalStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
