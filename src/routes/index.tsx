import { createBrowserRouter } from "react-router-dom";

// import pages and components
import {
  LeaderboardForQuiz,
  LeaderboardQuizList,
  Quiz,
  MainPage,
  ErrorPage,
  Layout,
  SuperSecretAdminPage,
} from "../pages";
import JoinQuiz from "../components/JoinQuiz.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "join-quiz",
        element: <JoinQuiz />,
      },
      {
        path: "quiz/:quizId",
        element: <Quiz />,
      },
      { path: "leaderboard", element: <LeaderboardQuizList /> },
      { path: "leaderboard/:quizId", element: <LeaderboardForQuiz /> },
      { path: "super-secret-admin-page", element: <SuperSecretAdminPage /> },
    ],
  },
]);
