import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
  useTheme,
} from "@mui/material";
import { SaveAlt } from "@mui/icons-material";

import { useCreateReportMutation, useGetProjectsQuery } from "state/api";

const DrawerCreateReport = ({
  inquiryId,
  projectId,
  salesStatus,
  projectStatus,
  onUpdate,
  toggleCreateDrawer,
}) => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [createReport] = useCreateReportMutation();
  const { data: projectsData } = useGetProjectsQuery();
  const theme = useTheme();

  // Create report handle function
  const handleCreateReport = async (data) => {
    try {
      // for Validation
      if (!inquiryId && !projectId) {
        console.error("No valid inquiryId or projectId provided.");
        return;
      }
      const selectedId = inquiryId ?? projectId;
      const selectedType = inquiryId ? "inquiry" : "project";
      const selectedStatus = salesStatus ?? projectStatus;

      const combinedData = {
        ...data,
        reportType: selectedType,
        reportStatus: selectedStatus,
      };

      await createReport({
        id: selectedId,
        data: combinedData,
      }).unwrap();

      onUpdate();
      toggleCreateDrawer();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        padding: 3,
        width: { sm: "300px", md: "400px" },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h4" color={theme.palette.secondary[100]}>
          보고서 작성
        </Typography>
        <Typography variant="subtitle2" color={theme.palette.secondary[300]}>
          새 보고서를 작성합니다.
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(handleCreateReport)}>
        <Stack
          direction="column"
          alignItems="center"
          marginTop="10px"
          spacing="10px"
        >
          {inquiryId === null && projectId === null && projectsData && (
            <FormControl fullWidth>
              <InputLabel id="project-select-label">Project</InputLabel>
              <Select
                labelId="project-select-label"
                {...register("projectId", { required: true })}
                label="Project"
                defaultValue=""
                onChange={(e) => setValue("projectId", e.target.value)}
              >
                {projectsData.data &&
                  [...projectsData.data]
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((project) => (
                      <MenuItem key={project._id} value={project._id}>
                        {project.projectTitle}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          )}
          <TextField
            label="보고서 작성"
            {...register("reportContent")}
            error={!!errors.reportContent}
            helperText={errors.reportContent?.message}
            fullWidth
            multiline
            rows={10}
          ></TextField>
          <Button
            type="submit"
            variant="outlined"
            color="secondary"
            size="large"
          >
            <SaveAlt />
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default DrawerCreateReport;
