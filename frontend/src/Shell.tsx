import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "./AuthContextProvider";

export function Shell() {
  const { pathname } = useLocation();
  const { logout } = useAuthContext();
  const links = [
    {
      route: "account",
      to: "/dashboard/account",
      title: "Account",
    },
    {
      route: "patient",
      to: "/dashboard/patient",
      title: "Patient",
    },
  ];
  return (
    <div className="flex h-screen p-4 gap-x-3">
      <div className="w-[250px] shadow-lg h-full rounded border flex flex-col items-center py-5  px-3">
        <div className="flex flex-col flex-1 w-full gap-y-10">
          <h1 className="text-2xl font-bold text-center">Dashboard</h1>
          <ul className="flex flex-col w-full gap-y-4">
            {links.map((lnk) => (
              <li
                key={lnk.to}
                className={`border rounded py-2 pl-3 w-full ${
                  pathname.includes(lnk.route)
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                <Link className="block w-full" to={lnk.to}>
                  {lnk.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={logout}
          className="w-full py-2 border border-black rounded "
        >
          Logout
        </button>
      </div>
      <div className="flex-1 h-full border rounded shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}
