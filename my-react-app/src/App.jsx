import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
    
      </>
    ),
    
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;