import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import type { MouseEventHandler } from "react";

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

const DeleteProjectModal = (props: {
    handleCloseDeleteModal: MouseEventHandler<HTMLButtonElement> | undefined,
    openDeleteModal: boolean,
    isDeleting: boolean,
    handleDeleteProject: MouseEventHandler<HTMLButtonElement>,
    project: Project | null,
}) => {
    const {handleCloseDeleteModal, openDeleteModal, isDeleting, handleDeleteProject, project} = props;
    return (
        <Dialog
              open={openDeleteModal}
              onClose={handleCloseDeleteModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Eliminar proyecto
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  ¿Estás seguro que deseas eliminar el proyecto: {project?.projectTitle} ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeleteModal} disabled={isDeleting}>Cancelar</Button>
                <Button onClick={handleDeleteProject} disabled={isDeleting} autoFocus>
                  Eliminar
                </Button>
              </DialogActions>
            </Dialog>
    )
}

export default DeleteProjectModal;