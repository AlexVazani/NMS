import { Route, Routes } from "react-router-dom";

import GetReports from "pages/reports/getReports";

const ReportRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GetReports />} />
    </Routes>
  );
};

export default ReportRoutes;
