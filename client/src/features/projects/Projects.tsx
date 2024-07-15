import { useEffect, useState } from "react"
import { useCreateProjectMutation, useDeleteProjectMutation, useGetProjectsQuery } from "../api/projectsApiSlice"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Fab, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import EditProjectModal from "../common/EditProjectModal";
import DeleteProjectModal from "../common/deleteProjectModal";
import GeneralAlert from "../common/generalAlert";

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

const menuButtons = [
  {
    placeholder: "Detalles",
    code: "DET",
  },
  {
    placeholder: "Eliminar",
    code: "DEL",
  }
]

export const Projects = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openSuccessDeleteSnack, setOpenSuccessDeleteSnackbar] = useState<boolean>(false);
  const [openCreateSuccessSnackbar, setOpenCreateSuccessSnackbar] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [projectSelected, setProjectSelected] = useState<Project | null>(null);
  const [openEditProjectModal, setOpenEditProjectModal] = useState<boolean>(false);
  const navigate = useNavigate();
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
      handleClose();
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

  const handleClick = (event: React.MouseEvent<HTMLElement>, project: Project) => {
    setProjectSelected(project);
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  }

  const handleOpenEditProjectModal = () => {
    setOpenEditProjectModal(!openEditProjectModal);
  }

  const handleCloseDeleteModal = () => {
    setOpenMenu(false);
    setOpenDeleteModal(false);
  }

  const handleClose = () => {
    setOpenMenu(false);
    setAnchorEl(null);
  }
  const handleDeleteProject = async () => {
    if(projectSelected?.id) {
      await deleteProject(projectSelected.id);
    } 
  }

  const handleMenuClick = (id: number, code: string, projectTitle: string) => {
    if (projectSelected) {
    switch(code) {
      case("DET"):
      navigate(`project/${projectSelected.id}`)
      break;
      case("DEL"):
      setOpenDeleteModal(true)
      break;
      default:
        console.log('CODE NOT FOUND IN CASES')
    }
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
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      ID
                    </TableCell>
                    <TableCell align="center">
                      Título
                    </TableCell>
                    <TableCell align="center">
                      Categoría(s)
                    </TableCell>
                    <TableCell align="center">
                      % Avance
                    </TableCell>
                    <TableCell align="center">
                      Acción
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody> 
                {data.projects.map((project: Project) => (
                  <TableRow>
                  <TableCell>
                    {project?.id}
                  </TableCell>
                  <TableCell align="center">
                    {project?.projectTitle}
                  </TableCell>
                  <TableCell align="center">
                    {project?.projectCategories.map((item, index) => (
                      item.description + (index === project?.projectCategories?.length - 1 ? '.' : ', ')
                    ))}
                  </TableCell>
                  <TableCell align="center">
                    {project?.completionRate}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(event) => handleClick(event, project)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu open={openMenu} anchorEl={anchorEl} onClose={handleClose}>
                      {menuButtons.map(({placeholder, code}) => (
                        <MenuItem onClick={() => handleMenuClick(project?.id, code, project?.projectTitle)}>
                         {placeholder}
                        </MenuItem>
                      ))}
                    </Menu>
                  </TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>
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
