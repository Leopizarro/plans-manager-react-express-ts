import type { SelectChangeEvent } from "@mui/material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useGetProjectCategoriesQuery } from "../../features/api/projectCategoryApiSlice";
import { useEffect, useState } from "react";


const EditProjectModal:React.FC<any> = (props: any) => {
    const {openEditProjectModal, handleCloseModal, projectData, isEdit, createProject, updateProject} = props;
    const { data: pCategories, isLoading: pCatLoading, isSuccess: pCatSuccess, isError: pCatIsError, error: pCatError} = useGetProjectCategoriesQuery();
    const [projectCatSelected, setProjectCatSelected] = useState<number[]>([]);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append("userId", "1");
        if (isEdit) {
          data.append("id", `${projectData.id}`)
        await updateProject(Object.fromEntries(data)).unwrap();
        }else {
          await createProject(Object.fromEntries(data)).unwrap();
        }
    }

    useEffect(() => {
        if (projectData?.projectCategories?.length) {
            setProjectCatSelected(
                projectData.projectCategories.map((pCat: {id: Number, description: string, code: string }) => pCat.id)
            )
        }
    }, [projectData])
    const handleChange = (event: SelectChangeEvent<typeof projectCatSelected>) => {
        const {
          target: { value },
        } = event;
        setProjectCatSelected(
          value as number[]
        );
      };
    return (
        <Dialog
              open={openEditProjectModal}
              onClose={handleCloseModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
                <Box component="form" onSubmit={handleSubmit}>
              <DialogTitle id="alert-dialog-title">
                {`${isEdit ? 'Editar' : 'Crear'} Projecto`}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Grid container justifyContent="center">
                        <Grid item xs={12}>
                            <TextField
                            name="projectTitle"
                            required
                            fullWidth
                            id="title"
                            label="Título"
                            autoFocus
                            defaultValue={projectData?.projectTitle}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            name="description"
                            required
                            fullWidth
                            id="description"
                            label="Descripción"
                            autoFocus
                            defaultValue={projectData?.description}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            name="completionRate"
                            required
                            fullWidth
                            id="completionRate"
                            label="% Completado"
                            autoFocus
                            defaultValue={projectData?.completionRate}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        {(projectData || !isEdit) && (<FormControl fullWidth required>
                            <InputLabel id="demo-simple-select-label">Categorías</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                name="projectCategories"
                                id="simple-select-importance"
                                value={projectCatSelected}
                                required
                                multiple
                                label="Categorías"
                                onChange={handleChange}
                            >
                                {pCategories?.projectCategories?.map((pC: {id: number, description: string, code: string}) => (
                                    <MenuItem value={pC.id} key={pC.code}>{pC.description}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>)}
                        </Grid>
                        </Grid>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal}>Cancelar</Button>
                <Button type="submit" autoFocus>
                  Confirmar
                </Button>
              </DialogActions>
              </Box>
            </Dialog>)
}

export default EditProjectModal