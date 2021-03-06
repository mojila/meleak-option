/* eslint-disable no-unused-vars */
import React from 'react'
import { Container, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MiniDrawer from '../components/miniDrawer'
import CurrentStats from '../components/currentStats'
import WebAppInfo from '../components/webAppInfo'

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
  const title = "Dashboard"

  return <Container disableGutters fixed className={classes.root}>
    <MiniDrawer isOpen={true} title={title} />
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container spacing={2}>
        <Grid item md={6}>
          <WebAppInfo />
        </Grid>
        <Grid item md={6}>
          <CurrentStats />
        </Grid>
      </Grid>
    </main>
  </Container>
}