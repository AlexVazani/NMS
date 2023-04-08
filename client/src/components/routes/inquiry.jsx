import { Route, Routes } from "react-router-dom";

import GetInquiries from "pages/marketing/getInquiries.jsx";
import ShowInquiry from "pages/marketing/showInquiry.jsx";

const InquiryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GetInquiries />} />
      <Route path="/:id" element={<ShowInquiry />} />
    </Routes>
  );
};

export default InquiryRoutes;
