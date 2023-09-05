import { Navigate, useRoutes } from "react-router-dom";
import { useAuthContext } from "./AuthContextProvider";
import Login from "./Login";
import Protected from "./Protected/Protected";
import { Shell } from "./Shell";
import Account from "./pages/account/Account";
import AccountCreate from "./pages/account/AccountCreate/AccountCreate";
import Patient from "./pages/patient/Patient";
import PatientCreate from "./pages/patient/PatientCreate";
import { useUserStore } from "./store/user.store";

function App() {
  const { user } = useUserStore();
  const { getUserFromLocalStorage } = useAuthContext();
  const userFromLocalStorage = getUserFromLocalStorage();
  const isAuthenticated = !!(user || userFromLocalStorage)?.id;
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: (
        <Protected isValid={!isAuthenticated} redirectRoute="/dashboard">
          <Login />
        </Protected>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <Protected isValid={isAuthenticated} redirectRoute="/">
          <Shell />
        </Protected>
      ),
      children: [
        { path: "", element: <Navigate to="/dashboard/account" /> },
        {
          path: "account",
          children: [
            {
              index: true,
              element: <Account />,
            },
            {
              path: "create",
              element: <AccountCreate />,
            },
            {
              path: "edit/:id",
              element: <AccountCreate />,
            },
          ],
        },
        {
          path: "patient",
          children: [
            {
              index: true,
              element: <Patient />,
            },
            {
              path: "create",
              element: <PatientCreate />,
            },
            {
              path: "edit/:id",
              element: <PatientCreate />,
            },
            {
              path: "edit/:id",
              element: <PatientCreate />,
            },
          ],
        },
      ],
    },
    { path: "/", element: <Login /> },
  ]);
  return routes;
}

export default App;
