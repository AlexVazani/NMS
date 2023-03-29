import { Route, Routes } from "react-router-dom";

import GetInvoices from "pages/invoices/getInvoices";

const InvoiceRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GetInvoices />} />
    </Routes>
  );
};

export default InvoiceRoutes;
