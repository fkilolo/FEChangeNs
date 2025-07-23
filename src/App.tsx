import ProtectedRoute from "@/components/share/protected-route";
import { useAppDispatch } from "@/redux/hooks";
import LayoutAdmin from "components/admin/layout.admin";
import NotFound from "components/share/not.found";
import LoginPage from "pages/auth/login";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutApp from "./components/share/layout.app";
import PermissionPage from "./pages/admin/business/permission";
import RolePage from "./pages/admin/business/role";
import UserPage from "./pages/admin/business/user";
import DashboardPage from "./pages/admin/dashboard";
import WhoIsDomain from "./pages/admin/whoIsDomain";
import { fetchAccount } from "./redux/slice/business/auth/accountSlide";


import Spaceship from "./pages/admin/spaceship";
import NameServer from "./pages/admin/spaceship/nameserver";
import ConnectSavPage from "./pages/admin/config-domain/connectSav";
import DomainSavPage from "./pages/admin/config-domain/domainSav";


export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return;
    dispatch(fetchAccount());
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LayoutApp>
          <LayoutAdmin />{" "}
        </LayoutApp>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          )
        },
        {
          path: "/user",
          element: <UserPage/>  // không qua ProtectedRoute
        },
        
        //management
        {
          path: "/management/permission",
          element:  <PermissionPage />
        },
        {
          path: "/management/role",
          element: <RolePage />
        },
        {
          path: "/managementSav/connect",
          element: <ConnectSavPage />
        },
        {
          path: "/managementSav/domain",
          element: <DomainSavPage />
        },
      
        {
          path: "/admin/spaceship",
          element: <Spaceship />
        },
        {
          path: "/admin/spaceship/nameserver",
          element: <NameServer />
        },
       
      ]
    },
    {
      path: "/login",
      element: <LoginPage />
    },

    // {
    //   path: "/register",
    //   element: <RegisterPage />,
    // },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
