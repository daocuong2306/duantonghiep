import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
    return <div>
        <RouterProvider router={router} />
    </div>;
};
export default App;
