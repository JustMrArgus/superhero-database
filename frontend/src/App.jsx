import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./pages/MainPage";
import SuperheroPage from "./pages/SuperheroPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={MainPage} />
          <Route path="/:id" element={SuperheroPage} />
          <Route path="*" element={NotFoundPage} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
