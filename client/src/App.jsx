import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { theme } from "theme/avdarkTheme";
import Layout from "pages/layout";
import Login from "pages/auth/login";
import RequireAuth from "pages/auth/requireAuth";
import Dashboard from "pages/dashboard";
import UserRoutes from "components/routes/user";
import InquiryRoutes from "components/routes/inquiry";
import ProjectRoutes from "components/routes/project";
import ReportRoutes from "components/routes/report";
import InvoiceRoutes from "components/routes/invoice";
import PartnerRoutes from "components/routes/partner";
import ScheduleRoutes from "components/routes/schedule";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* <Route element={<RequireAuth />}> */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user/*" element={<UserRoutes />} />
              <Route path="/inquiries/*" element={<InquiryRoutes />} />
              <Route path="/projects/*" element={<ProjectRoutes />} />
              <Route path="/reports/*" element={<ReportRoutes />} />
              <Route path="/invoices/*" element={<InvoiceRoutes />} />
              <Route path="/partners/*" element={<PartnerRoutes />} />
              <Route path="/schedule/*" element={<ScheduleRoutes />} />
            </Route>
            {/* </Route> */}
            <Route path="login" element={<Login />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
