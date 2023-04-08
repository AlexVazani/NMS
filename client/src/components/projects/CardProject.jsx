import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({
  _id,
  projectNo,
  projectTitle,
  spaceType,
  spaceSize,
  spaceLocation,
  clientName,
  clientPhone,
  projectManager,
  projectPrice,
  projectStatus,
  projectDescription,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        {/* ProjectStatus */}
        <Typography
          variant="h6"
          color={theme.palette.secondary[300]}
          gutterBottom
        >
          {projectStatus}
        </Typography>
        {/* projectTitle */}
        <Typography variant="h4" component="div">
          {projectTitle}
        </Typography>
        {/* spaceType */}
        <Typography
          variant="subtitle1"
          sx={{ mb: "1.5rem" }}
          color={theme.palette.secondary[400]}
        >
          {spaceType}
        </Typography>
        {/* ProjectDescription */}
        <Typography variant="body1" color="#CFCCE4">
          {projectDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            More
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => navigate(`/projects/${_id}`)}
          >
            Show
          </Button>
        </Stack>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          {/* ClientName */}
          <Typography variant="subtitle2">고객명: {clientName}</Typography>
          {/* ClientPhone */}
          <Typography variant="subtitle2">Phone: {clientPhone}</Typography>
          {/* SpaceLocation */}
          <Typography variant="subtitle2">공사지: {spaceLocation}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProjectCard;
