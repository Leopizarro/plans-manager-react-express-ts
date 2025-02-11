import { IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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


const ProjectsTable: React.FC<{
    data: { projects: Project[] },
    setProjectSelected: (project: Project) => void,
    projectSelected: Project | null,
    setOpenDeleteModal: (option: boolean) => void
}> = (props) => {
    const { data, setProjectSelected, projectSelected, setOpenDeleteModal } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const navigate = useNavigate()

    const handleMenuClick = (id: number, code: string, projectTitle: string) => {
        if (projectSelected) {
        switch(code) {
          case("DET"):
            navigate(`project/${projectSelected.id}`)
          break;
          case("DEL"):
            setOpenDeleteModal(true)
            setOpenMenu(false);
            setAnchorEl(null);
          break;
          default:
            console.log('CODE NOT FOUND IN CASES')
        }
       }
      }
    
      const handleClose = () => {
        setOpenMenu(false);
        setAnchorEl(null);
      }
    
      const handleClick = (event: React.MouseEvent<HTMLElement>, project: Project) => {
        setProjectSelected(project);
        setAnchorEl(event.currentTarget);
        setOpenMenu(true);
      }

    return (
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
                      {menuButtons.map(({placeholder, code} : {placeholder: string, code: string}) => (
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
    )
}

export default ProjectsTable;