import { Alert, Snackbar } from "@mui/material";

const GeneralAlert = (props: {
    openSnackbar: boolean,
handleSnackBarClose : (event: React.SyntheticEvent | Event, reason?: string, snackBar?: string) => void,
alertMessage: string,
keyName: string
}) => {
    const {openSnackbar, handleSnackBarClose, alertMessage, keyName} = props;
    return(
        <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={(event,reason) => handleSnackBarClose(event, reason, keyName)}
        message={alertMessage}
        key={keyName}
      >
        <Alert
          onClose={(event) => handleSnackBarClose(event, "", keyName)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
      >
      {alertMessage}
          </Alert>
        </Snackbar>
    )
}

export default GeneralAlert;