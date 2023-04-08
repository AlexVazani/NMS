import { Route, Routes } from "react-router-dom";

import GetUsers from "pages/user/getUsers.jsx";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GetUsers />} />
    </Routes>
  );
};

export default UserRoutes;
