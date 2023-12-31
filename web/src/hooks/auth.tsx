import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  isAdmin: boolean;
  signIn: (props: SignInProps) => Promise<void>;
  signOut: () => void;
  user: any;
  isLogged: boolean
}

interface SignInProps {
  email?: string | undefined;
  password?: string | undefined;
}

interface UserDataProps {
  user?: any;
  token?: string;
}

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [userData, setUserData] = useState<UserDataProps>({});
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLogged, setIsLogged] = useState(false)

  async function signIn(data: SignInProps) {
    try {
      const response = await api.post("/sessions", data);
      const { user, token } = response.data;

      localStorage.setItem("@foodexplorer:user", JSON.stringify(user));
      localStorage.setItem("@foodexplorer:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUserData({ user, token });

      if (user.role === "admin") setIsAdmin(true)

      setIsLogged(true)

    } catch (err: any) {
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@foodexplorer:token");
    localStorage.removeItem("@foodexplorer:user");

    setUserData({});
    setIsAdmin(false)
    setIsLogged(false)

  }

  useEffect(() => {
    const token = localStorage.getItem("@foodexplorer:token");
    const user = localStorage.getItem("@foodexplorer:user");
    const userObj = JSON.parse(user)

    if (userObj && userObj.role === "admin") setIsAdmin(true)

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUserData({
        token,
        user: JSON.parse(user),
      });
    } else {
      signOut()
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAdmin, signIn, signOut, user: userData.user, isLogged }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
