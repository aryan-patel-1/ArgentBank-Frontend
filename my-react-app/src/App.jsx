import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/SignIn/signIn";
import User from "./Pages/User/User";
import Transaction from "./Pages/Transaction/Transaction";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/signIn", element: <SignIn /> },
      { path: "/user", element: <User /> },
      { path: "/transactions", element: <Transaction /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
