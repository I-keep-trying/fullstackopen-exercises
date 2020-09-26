import React from 'react'
import {
  Paper,
  AppBar,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core'

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
})

const App = (props) => {
  const { classes } = props

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography color="inherit" type="title">
            My Title
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper>
        <div className={classes.toolbar} />
        MyContent will be shifted downwards by the div above. If you remove the
        div, your content will disappear under the app bar.
      </Paper>
    </div>
  )
}

export default withStyles(styles)(App)
