import { Route, Routes } from "react-router-dom";

import GetProjects from "pages/projects/getProjects.jsx";
import ShowProject from "pages/projects/showProject.jsx";

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GetProjects />} />
      <Route path="/:id" element={<ShowProject />} />
    </Routes>
  );
};

export default ProjectRoutes;
