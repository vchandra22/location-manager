import IndexPage from "./pages/index.jsx";

import "preline/preline";
import Sidebar from "./layouts/sidebar.jsx";
function App() {

  return (
    <>
      <Sidebar>
        <IndexPage/>
      </Sidebar>
    </>
  )
}

export default App;
