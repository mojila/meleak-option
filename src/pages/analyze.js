import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MiniDrawer from '../components/miniDrawer'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}))

export default function Analyze() {
  const classes = useStyles();
  const title = "Analyze"

  return <Container disableGutters fixed className={classes.root}>
    <MiniDrawer isOpen={true} title={title} />
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {/* content */}
      <div>blank</div>
    </main>
  </Container>
}