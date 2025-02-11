import {
    Typography
} from "@mui/material";
import { useDeleteProjectMutation, useGetOneProjectQuery, useUpdateProjectMutation } from "../features/api/projectsApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateProjectMilestone from "../components/project-details/CreateProjectMilestone";
import EditProjectModal from "../components/common/EditProjectModal";
import { useCreateProjectMilestoneMutation } from "../features/api/milestoneApiSlice";
import ProjectDetailsTable from "../components/project-details/ProjectDetailsTable";
import DeleteProjectModal from "../components/common/DeleteProjectModal";
import GeneralAlert from "../components/common/GeneralAlert";

const ProjectDetails: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate()
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [openCreateMilestoneModal, setOpenCreateMilestoneModal] = useState<boolean>(false);
    const [openEditProjectModal, setOpenEditProjectModal] = useState<boolean>(false);
    const [openUpdateSuccessSnackbar, setOpenUpdateSuccessSnackbar] = useState<boolean>(false);
    const [openMilestoneSuccessSnackbar, setOpenMilestoneSuccessSnackbar] = useState<boolean>(false);
    const [openDeleteProjectSnackBar, setOpenDeleteProjectSnackBar] = useState<boolean>(false);
    const { data, isLoading, isSuccess, isError, error} = useGetOneProjectQuery(Number(params.projectId));
    const [updateProject, { isLoading: isUpdatingProject, isSuccess: succesUpdating, reset: resetUpdateProject }] = useUpdateProjectMutation();
    const [deleteProject, { isLoading: isDeleting, isSuccess: successDeleting, reset: resetProjectDeletion }] = useDeleteProjectMutation();
    const [createMilestone, { isLoading: isCreatingMilestone, isSuccess: successCreateMilestone, reset: resetMilestonCreation }] = useCreateProjectMilestoneMutation();
    const deleteProjectAlertKey = "projectDeletion";
    const updateProjectAlertKey = "projectUpdate";
    const milestoneCreatedAlertKey = "milestoneCreation";
    useEffect(() => {
        if(succesUpdating) {
            setOpenUpdateSuccessSnackbar(true);
            setOpenEditProjectModal(false);
            resetUpdateProject();
        }
        if(successCreateMilestone) {
            setOpenMilestoneSuccessSnackbar(true);
            setOpenCreateMilestoneModal(false);
            resetMilestonCreation();
        }
        if(successDeleting) {
            setOpenDeleteProjectSnackBar(true);
            setOpenDeleteModal(false);
            resetProjectDeletion();
            navigate('/', { state: { deletedProjectSuccess: true}, replace: true});
        }
    }, [succesUpdating, successCreateMilestone, successDeleting]);

    const handleOpenCreateMilestone = () => {
        setOpenCreateMilestoneModal(!openCreateMilestoneModal);
    }

    const handleOpenEditProjectModal = () => {
        setOpenEditProjectModal(!openEditProjectModal);
    }

    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true);
    }

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    }

    const handleDeleteProject = async () => {
        await deleteProject(Number(params.projectId)).unwrap();
    
    }
    const handleSnackBarClose = (event: React.SyntheticEvent | Event, reason?: string, snackBar?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        switch(snackBar){
            case(milestoneCreatedAlertKey):
            setOpenMilestoneSuccessSnackbar(false);
            break;
            case(updateProjectAlertKey):
            setOpenUpdateSuccessSnackbar(false);
            break;
            case(deleteProjectAlertKey):
            setOpenDeleteProjectSnackBar(false);
            break;
            default:
                console.log('ninguna de las opciones')
        }
      }
    return (
        <>
        {isLoading && <Typography>Cargando información...</Typography>}
        {isError && <Typography align="center"> {error?.data?.message || 'ha ocurrido un error inesperado'}</Typography>}
        {isSuccess && (
            <>
            <Typography component='h1' fontSize="2.3rem" align='center'> Detalles Proyecto </Typography>
            <ProjectDetailsTable
            project={data?.project}
            handleOpenDeleteModal={handleOpenDeleteModal}
            handleOpenEditProjectModal={handleOpenEditProjectModal}
            handleOpenCreateMilestone={handleOpenCreateMilestone}
            />
            </>
        )}
        <DeleteProjectModal 
            openDeleteModal={openDeleteModal}
            handleCloseDeleteModal={handleCloseDeleteModal}
            project={data?.project}
            isDeleting={isDeleting}
            handleDeleteProject={handleDeleteProject}
        />
            <CreateProjectMilestone openCreateMilestoneModal={openCreateMilestoneModal} handleCloseModal={handleOpenCreateMilestone} createMilestone={createMilestone}/>
            <EditProjectModal openEditProjectModal={openEditProjectModal} handleCloseModal={handleOpenEditProjectModal} projectData={data?.project} isEdit={true} updateProject={updateProject}/>
            <GeneralAlert openSnackbar={openUpdateSuccessSnackbar} handleSnackBarClose={handleSnackBarClose} alertMessage={"¡Proyecto actualizado con éxito!"} keyName={updateProjectAlertKey}/>
            <GeneralAlert openSnackbar={openMilestoneSuccessSnackbar} handleSnackBarClose={handleSnackBarClose} alertMessage={"¡Hito creado con éxito!"} keyName={milestoneCreatedAlertKey}/>
            <GeneralAlert openSnackbar={openDeleteProjectSnackBar} handleSnackBarClose={handleSnackBarClose} alertMessage={"¡Proyecto eliminado con éxito!"} keyName={deleteProjectAlertKey}/>
        </>
    )
}

export default ProjectDetails;