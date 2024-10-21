import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./page/auth/login/Login";
import Signup from "./page/auth/signup/Signup";
import Brand from "./page/dashboard/brand/Brand";
import Creator, {
  loader as AvailableCampaignLoader,
} from "./page/dashboard/creator/Creator";
import CreateCampaign, {
  createCampaignAction,
} from "./components/createCampaign/CreateCampaign";
import ContentUpload from "./components/contentUpload/ContentUpload";
import Applicants, {
  loader as applicantsLoader,
} from "./components/applicants/Applicants";
import ApplyCampaign, {
  action as applyCampaignAction,
  loader as campaignDetailsLoader,
} from "./page/applyCampaign/ApplyCampaign";
import CampaignContentManagement, {
  loader as submissionLoader,
} from "./page/management/CampaignContentManagement";
import { loader as campaignLoader } from "./components/campaign/CampaignSection";
import { loader as logout } from "./page/auth/logout/Logout";
import ErrorPage from "./page/error/ErrorPage";

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />,
      children: [{ path: "logout", loader: logout }],
    },
    { path: "/signup", element: <Signup /> },
    {
      path: "/dashboard/brand",
      loader: campaignLoader,
      element: <Brand />,
      children: [
        {
          path: "create",
          element: <CreateCampaign />,
          action: createCampaignAction,
        },
      ],
    },
    {
      path: "/brand/management/:id",
      element: <CampaignContentManagement />,
      loader: submissionLoader,
    },
    {
      path: "/dashboard/brand/detail/:id",
      element: <Applicants />,
      loader: applicantsLoader,
    },
    {
      path: "/dashboard/creator",
      element: <Creator />,
      loader: AvailableCampaignLoader, // Loader at the parent (Creator) level if it needs campaigns
      children: [
        {
          path: "upload/:id",
          element: <ContentUpload allowedFileTypes={["image", "video"]} />,
        },
      ],
    },
    {
      path: "/dashboard/creator/detail/:id",
      element: <ApplyCampaign />,
      loader: campaignDetailsLoader,
      action: applyCampaignAction,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
