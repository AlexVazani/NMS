import { Route, Routes } from "react-router-dom";

import GetSchedule from "pages/schedule/getSchedule";

const ScheduleRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GetSchedule />} />
    </Routes>
  );
};

export default ScheduleRoutes;
