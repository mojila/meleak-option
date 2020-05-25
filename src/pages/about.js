import React from 'react'
import { Container, Typography } from '@material-ui/core'
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

export default function Home() {
  const classes = useStyles();
  const title = "About"

  return <Container disableGutters fixed className={classes.root}>
    <MiniDrawer isOpen={true} title={title} />
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Typography paragraph>
        My Name is Mojila, you can find me at github.com/mojila <br/>
        I build this app for my final project research. so if you interest to join me develop this app, i'll very welcome. <br/>
        &copy; 2020 
      </Typography>
    </main>
  </Container>
}