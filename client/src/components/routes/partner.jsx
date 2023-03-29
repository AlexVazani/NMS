import { Route, Routes } from "react-router-dom";

import GetPartners from "pages/partners/getPartners";

const PartnerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GetPartners />} />
      {/* <Route path="/:id" element={<ShowPartner />} /> */}
    </Routes>
  );
};

export default PartnerRoutes;
