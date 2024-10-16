import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./page/auth/login/Login";
import Signup from "./page/auth/signup/Signup";
import Brand from "./page/dashboard/brand/Brand";
import Creator from "./page/dashboard/creator/Creator";

function App() {
  let router = createBrowserRouter([
    {path:"/",element:<Login/>},
    {path:"/signup",element:<Signup/>},
    {path:"/dashboard/brand",element:<Brand/>},
    {path:"/dashboard/creator",element:<Creator/>}
  ]);

  return <RouterProvider router={router} />;
}

export default App;
