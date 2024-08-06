import LayoutDefault from "../layout/LayoutDefault";
import Answers from "../pages/Answers";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Topic from "../pages/Topic";

export const routes = [
  {
    path: '/',
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'topic',
        element: <Topic />
      },
      {
        path: 'answers',
        element: <Answers />
      },
    ]
  }
]