import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./page/auth/login/Login";
import Signup from "./page/auth/signup/Signup";

function App() {
  let router = createBrowserRouter([
    {path:"/",element:<Login/>},
    {path:"/signup",element:<Signup/>}
  ]);

  return <RouterProvider router={router} />;
}

export default App;
