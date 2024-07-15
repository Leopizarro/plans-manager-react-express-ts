import { Button, Collapse, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState, type MouseEventHandler } from "react";

interface Project {
    id: number
    projectTitle: string
    description: string
    completionRate: number
    createdAt: string
    updatedAt: string
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
      createdAt: string
      completedAt: string | null
      observation: string
    }[]
  }

const ProjectsTable: React.FC<any> = (props: {
    project: Project,
    handleOpenDeleteModal: MouseEventHandler<HTMLButtonElement>,
    handleOpenEditProjectModal: MouseEventHandler<HTMLButtonElement>,
    handleOpenCreateMilestone: MouseEventHandler<HTMLButtonElement>
    }) => {
    const { project, handleOpenDeleteModal, handleOpenEditProjectModal, handleOpenCreateMilestone } = props;
    const [openCollapse, setOpenCollapse] = useState<boolean>(false)
    return (
        <>
        <Table>
                <TableHead>
                    <TableRow>
                    <TableCell colSpan={3} align="center">
                        Proyecto: {project.projectTitle}
                    </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">
                        Descripción
                    </TableCell>
                    <TableCell align="center">
                        {project.description}
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">
                        Fecha Creación
                    </TableCell>
                    <TableCell align="center">
                        {project.createdAt}
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">
                        % Completado
                    </TableCell>
                    <TableCell align="center">
                        {project.completionRate}%
                    </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>
                    </TableCell>
                    <TableCell align="center">
                        Categorías
                    </TableCell>
                    <TableCell align="center">
                        {project.projectCategories?.map((pCat: any, index: number) => (
                            pCat.description + (index === project.projectCategories.length - 1 ? '' : ', ')
                        ))}
                    </TableCell>
                    </TableRow>
                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton onClick={() => setOpenCollapse(!openCollapse)}>
                            {openCollapse ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                        </IconButton>
                    </TableCell>
                    <TableCell align="center">
                        Hitos
                    </TableCell>
                    <TableCell align="center">
                        {project.projectMilestones?.length}
                    </TableCell>
                    </TableRow>
                    <TableRow sx={{ padding: '0px'}}>
                        <TableCell colSpan={3} sx={{ padding: '0px'}}>
                        <Collapse in={openCollapse} unmountOnExit>
                            <Table sx={{ margin: '12px'}}>
                                <TableHead>
                                    <TableCell>
                                        Nombre
                                    </TableCell>
                                    <TableCell>
                                        Descripción
                                    </TableCell>
                                    <TableCell>
                                        Completado
                                    </TableCell>
                                    <TableCell>
                                        Importancia
                                    </TableCell>
                                </TableHead>
                                <TableBody>
                                    {project?.projectMilestones.map((pjctM: any) => (
                                        <TableRow>
                                        <TableCell>
                                            {pjctM.title}
                                        </TableCell>
                                        <TableCell>
                                        {pjctM.description}
                                    </TableCell>
                                    <TableCell>
                                    {pjctM.completedAt ? 'Sí' : 'No'}
                                </TableCell>
                                <TableCell>
                                {pjctM.projectActivityImportance.description}
                            </TableCell>
                            </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Collapse>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Grid container textAlign="center" margin={1}>
                <Grid item xs={4}> 
                    <Button variant="contained" color="error" onClick={handleOpenDeleteModal}>
                        Eliminar
                    </Button>
                </Grid>
                <Grid item xs={4} >
                    <Button variant="contained" onClick={handleOpenEditProjectModal}>
                        Editar
                    </Button>
                </Grid>
                <Grid item xs={4} >
                    <Button variant="contained" color="success" onClick={handleOpenCreateMilestone}>
                         Agregar Hito
                    </Button>
                </Grid>
            </Grid>
            </>
    )
}

export default ProjectsTable;