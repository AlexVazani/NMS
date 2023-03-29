import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { theme } from "theme/avdarkTheme";
import Layout from "pages/layout";
import Dashboard from "pages/dashboard";
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
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects/*" element={<ProjectRoutes />} />
              <Route path="/reports/*" element={<ReportRoutes />} />
              <Route path="/invoices/*" element={<InvoiceRoutes />} />
              <Route path="/partners/*" element={<PartnerRoutes />} />
              <Route path="/schedule/*" element={<ScheduleRoutes />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
