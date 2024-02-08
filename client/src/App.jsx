import "./App.css";
import CreateProduts from "./Compontents/CreateProduts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShowAllListings, {
  loader as showLoader,
} from "./Compontents/ShowAllListings";
import UpdateProduct, {
  loader as updateLoader,
} from "./Compontents/UpdateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateProduts />,
  },
  {
    path: "/ShowListing",
    element: <ShowAllListings />,
    loader: showLoader,
  },
  {
    path: "/UpdateListing/:id",
    element: <UpdateProduct />,
    loader: updateLoader,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
