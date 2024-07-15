import { AppBar, Box, Container, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import "./App.css"
import { Outlet } from "react-router-dom"

const App = () => {
  return (
    <>
    <Box sx={{ flexGrow: 1}}>
      <AppBar sx={{ backgroundColor: 'black'}} position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2}}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Project Scheduler
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Container sx={{ minHeight: "100vh", paddingLeft: "0px !important", paddingRight: "0px !important" }}>
      <Outlet/>
    </Container>
    </>
  )
}

export default App
