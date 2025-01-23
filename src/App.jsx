import IndexPage from "./pages/index.jsx";

import "preline/preline";
import Sidebar from "./layouts/Sidebar.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateData from "./pages/CreateData.jsx";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sidebar />}>
            <Route index element={<IndexPage />} />
            <Route path="/add-location" element={<CreateData />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
