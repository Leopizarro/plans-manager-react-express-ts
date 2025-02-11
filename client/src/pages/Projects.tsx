import { useEffect, useState } from "react"
import { useCreateProjectMutation, useDeleteProjectMutation, useGetProjectsQuery } from "../features/api/projectsApiSlice"
import { Fab } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import EditProjectModal from "../components/common/EditProjectModal";
import DeleteProjectModal from "../components/common/DeleteProjectModal";
import GeneralAlert from "../components/common/GeneralAlert";
import ProjectsTable from "../components/projects/ProjectsTable";

interface Project {
  id: number
  projectTitle: string
  description: string
  completionRate: number
  createdAt: Date
  updatedAt: Date
  user: {
    id: number
    firstName: string
    lastName: string
  }
  projectCategories: {
    id: number
    code: string
    description: string
  }[]
  projectMilestones: {
    id: number
    title: string
    description: string
    createdAt: Date
    completedAt: Date | null
    observation: string
  }[]
}

export const Projects = () => {
  const [openSuccessDeleteSnack, setOpenSuccessDeleteSnackbar] = useState<boolean>(false);
  const [openCreateSuccessSnackbar, setOpenCreateSuccessSnackbar] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [projectSelected, setProjectSelected] = useState<Project | null>(null);
  const [openEditProjectModal, setOpenEditProjectModal] = useState<boolean>(false);
  const location = useLocation();
  const { data, isError, isLoading, isSuccess, error } =
  useGetProjectsQuery()
  const [deleteProject, { isLoading: isDeleting, isSuccess: deleteSuccess, reset: resetDeleteProject }] = useDeleteProjectMutation();
  const [createProject, { isLoading: isCreatingProject, isSuccess: successCreating, reset: resetCreateProject }] = useCreateProjectMutation();
  const deleteProjectAlertKey = "projectDeletion";
  const createProjectAlertKey = "projectCreation";

  useEffect(() => {
    if (deleteSuccess) {
      setOpenDeleteModal(false);
      setOpenSuccessDeleteSnackbar(true);
      resetDeleteProject();
    }
    if (successCreating) {
      setOpenCreateSuccessSnackbar(true);
      setOpenEditProjectModal(false);
      resetCreateProject();

    }
  }, [deleteSuccess, successCreating]);

  useEffect(() => {
    if (location?.state?.deletedProjectSuccess) {
      setOpenSuccessDeleteSnackbar(true);
      window.history.replaceState({},"")
    }
  },[])

  const handleOpenEditProjectModal = () => {
    setOpenEditProjectModal(!openEditProjectModal);
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  }

  const handleDeleteProject = async () => {
    if(projectSelected?.id) {
      await deleteProject(projectSelected.id);
    } 
  }

  const handleSnackBarClose = (event: React.SyntheticEvent | Event, reason?: string, snackBar?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    switch(snackBar){
        case(createProjectAlertKey):
        setOpenCreateSuccessSnackbar(false);
        break;
        case(deleteProjectAlertKey):
        setOpenSuccessDeleteSnackbar(false);
        break;
        default:
            console.log('ninguna de las opciones')
    }
  }

    return (
      <div>
        <h3>
          Proyectos
        </h3>
        {isError && 
        (<div>
          <h1>¡Ocurrió un error!</h1>
        </div>
        )}
        {isLoading && (
        <div>
          <h1>Loading...</h1>
        </div>
        )}
        {isSuccess && (
          <>
            <ProjectsTable data={data} setProjectSelected={setProjectSelected} projectSelected={projectSelected} setOpenDeleteModal={setOpenDeleteModal}/>
            <Fab color="success" aria-label="add" sx={{ position: "absolute", bottom: "16px", right: "10px"}} onClick={handleOpenEditProjectModal}>
              <AddIcon />
            </Fab>
            <DeleteProjectModal 
            openDeleteModal={openDeleteModal}
            handleCloseDeleteModal={handleCloseDeleteModal}
            project={projectSelected}
            isDeleting={isDeleting}
            handleDeleteProject={handleDeleteProject}
            />
            <EditProjectModal openEditProjectModal={openEditProjectModal} handleCloseModal={handleOpenEditProjectModal} isEdit={false} createProject={createProject}/>
            <GeneralAlert openSnackbar={openSuccessDeleteSnack} handleSnackBarClose={handleSnackBarClose} alertMessage={"¡Proyecto eliminado con éxito!"} keyName={deleteProjectAlertKey}/>
            <GeneralAlert openSnackbar={openCreateSuccessSnackbar} handleSnackBarClose={handleSnackBarClose} alertMessage={"¡Proyecto creado con éxito!"} keyName={createProjectAlertKey}/>
          </>
        )}
      </div>
    )
}
