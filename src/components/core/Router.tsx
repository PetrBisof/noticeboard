import { Route, Routes } from "react-router-dom";
import NoticeList from "../../pages/NoticeList";
import NoticeDetail from "../../pages/NoticeDetail";

function Router() {
  return (
    <div>
      <Routes>
        <Route index path="noticeboard/" element={<NoticeList />} />
        <Route
          path="noticeboard/productDetail/:id"
          element={<NoticeDetail />}
        />
      </Routes>
    </div>
  );
}

export default Router;
