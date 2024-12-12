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
import Tutorials from "../Pages/User/Tutorials/Tutorials";
import ManageVocabularies from "../Pages/Admin/ManageVocabularies/ManageVocabularies";
import ManageLessons from "../Pages/Admin/ManageLessons/ManageLessons";
import PrivateRoute from "./PrivateRoute";
import LessonDetails from "../Pages/User/Lessons/LessonDetails";
import ManageTutorials from "../Pages/Admin/ManageTutorials/ManageTutorials";

const router = createBrowserRouter([
    {
        path: "/",
        element: <User />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: "/",
                element: <PrivateRoute><Lessons /></PrivateRoute>,
            },
            {
                path: "/lesson-details/:id",
                element: <LessonDetails/>
            },
            {
                path: "/tutorials",
                element: <PrivateRoute><Tutorials /></PrivateRoute>
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
                path: "createlesson",
                element: <AdminRoute><CreateLessons /></AdminRoute>
            },
            {
                path: "manageusers",
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: "createVocabularies",
                element: <AdminRoute><CreateVocabularies /></AdminRoute>
            },
            {
                path: "managevocabularies",
                element: <AdminRoute><ManageVocabularies /></AdminRoute>
            },
            {
                path: "managelessons",
                element: <AdminRoute><ManageLessons /></AdminRoute>
            },
            {
                path: "managetutorials",
                element: <AdminRoute><ManageTutorials /></AdminRoute>
            }
        ]
    }
]);
export default router;