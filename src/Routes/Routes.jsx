import { createBrowserRouter } from "react-router-dom";
import User from "../Layout/User";
import Admin from "../Layout/Admin";
import Login from "../Pages/Login/Login";
import PageNotFound from "../components/Error/PageNotFound";
import Register from "../Pages/Register/Register";
import Lessons from "../Pages/User/Lessons/Lessons";
import AdminRoute from "./AdminRoutes";
import ManageUsers from "../Pages/Admin/ManageUsers/ManageUsers";
import CreateLessons from "../Pages/Admin/CreateLessons/CreateLessons";
import CreateVocabularies from "../Pages/Admin/CreateVocabularies/CreateVocabularies";

const router = createBrowserRouter([
    {
        path: "/",
        element: <User />,
        children: [
            {
                path: "/",
                element: <Lessons />,
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
          
        ],

    },
    {
        path: "/dashboard",
        element: <AdminRoute><Admin /></AdminRoute>,
        errorElement: <PageNotFound />,
        children: [
            {
                path: "createlessons",
                element: <CreateLessons/>
            },
            {
                path: "manageusers",
                element: <ManageUsers/>
            },
            {
                path: "createVocabularies",
                element: <CreateVocabularies/>
            }
        ]
    }
]);
export default router;