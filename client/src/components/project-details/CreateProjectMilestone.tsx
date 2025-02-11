import type { SelectChangeEvent } from "@mui/material";
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { useState } from "react";
import { useGetActivityImportancesQuery } from "../../features/api/activityImportanceApiSlice";
import { useGetMilestoneStagesQuery } from "../../features/api/milestoneStagesApiSlice";
import { useParams } from "react-router-dom";

const CreateProjectMilestone = (props: any) => {
    const { openCreateMilestoneModal, handleCloseModal, createMilestone } = props;
    const params = useParams();
    const { data: actImportances, isLoading: actImpLoading, isSuccess: actImpSuccess, isError: actImpIsError, error: actImpError} = useGetActivityImportancesQuery();
    const { data: milestoneStages, isLoading: milestoneStagesLoading, isSuccess: milestoneStagesSuccess, isError: milestoneStagesIsError, error: milestoneStagesError} = useGetMilestoneStagesQuery();
    const [importanceValue, setImportanceValue] = useState<string>('')
    const [stageValue, setStageValue] = useState<string>('')
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    const handleCheckboxClick = () => {
        setIsCompleted(!isCompleted);
    }
    const handleImportanceChange = (event: SelectChangeEvent) => {
        setImportanceValue(event.target.value as string);
    };
    const handleStageChange = (event: SelectChangeEvent) => {
        setStageValue(event.target.value as string);
      };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(!data.get("completedAt")) {
        data.append('completedAt', '')
    }
      data.append("projectId", `${params.projectId}`)
      await createMilestone(Object.fromEntries(data));
    };
    return (
        <Dialog
              open={openCreateMilestoneModal}
              onClose={handleCloseModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
                <Box component="form" onSubmit={handleSubmit}>
              <DialogTitle id="alert-dialog-title">
                {"Crear nuevo hito"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Grid container justifyContent="center">
                        <Grid item xs={12}>
                            <TextField
                            name="title"
                            required
                            fullWidth
                            id="title"
                            label="Título"
                            autoFocus
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            name="observation"
                            required
                            fullWidth
                            id="observation"
                            label="Observación"
                            autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel id="demo-simple-select-label">Importancia</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                name="activityImportanceId"
                                id="simple-select-importance"
                                value={importanceValue}
                                required
                                label="Importance"
                                onChange={handleImportanceChange}
                            >
                                {actImportances?.activityImportances?.map((mS: any) => (
                                    <MenuItem value={mS.id} key={mS.code}>{mS.description}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel id="demo-simple-select-label">Etapa</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="simple-select-stage"
                                name="milestoneStageId"
                                value={stageValue}
                                required
                                label="Stage"
                                onChange={handleStageChange}
                            >
                                {milestoneStages?.milestoneStages?.map((mS: any) => (
                                    <MenuItem value={mS.id} key={`${mS.code}-menu-item`}>{mS.description}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox onClick={handleCheckboxClick} checked={isCompleted}/>} label="Hito Completado" />
                            </FormGroup>
                        </Grid>
                        {isCompleted && <Grid item xs={12}>
                            <FormControl fullWidth required>
                            <DatePicker label="Fecha completado" disabled={!isCompleted} name="completedAt" slotProps={{
              textField: {
                required: true,
              },
            }}/>
                            </FormControl>
                        </Grid>}
                    </Grid>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal}>Cancelar</Button>
                <Button type="submit" autoFocus>
                  Crear
                </Button>
              </DialogActions>
              </Box>
            </Dialog>
    )
}

export default CreateProjectMilestone;