import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./page/auth/login/Login";
import Signup from "./page/auth/signup/Signup";
import Brand from "./page/dashboard/brand/Brand";
import Creator from "./page/dashboard/creator/Creator";
import CreateCampaign from "./components/createCampaign/CreateCampaign";
import ContentUpload from "./components/contentUpload/ContentUpload";
import Applicants from "./components/applicants/Applicants";

function App() {
  let router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    {
      path: "/dashboard/brand",
      element: <Brand />,
      children: [
        { path: "create", element: <CreateCampaign /> },
      ],
    },
    {path:'/dashboard/brand/detail/:id',element:<Applicants/>},
    {
      path: "/dashboard/creator",
      element: <Creator />,
      children: [
        {
          path: "upload",
          element: <ContentUpload allowedFileTypes={['image','video']} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
