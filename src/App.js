import Signup from "./Component/Signup/Signup";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Component/Login/Login";
import Todo from "./Component/Todo/Todo";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/Todo",
      element: <Todo />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
