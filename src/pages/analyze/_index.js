/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { Container, Card, CardContent, Grid, Typography, CardActions, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MiniDrawer from '../../components/miniDrawer'
import Context from '../../context'
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  card: {
    title: {
      fontSize: 14
    },
    minWidth: 275,
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

export default function DetailAnalyze() {
  const { index } = useParams()
  const { store } = useContext(Context)
  const classes = useStyles();
  const title = "Analyze"

  return <Container disableGutters fixed className={classes.root}>
    <MiniDrawer isOpen={true} title={title} />
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {/* content */}
      <Grid container spacing={2}>
        <Grid item md={3}>
          Hello {index}
        </Grid>
      </Grid>
    </main>
  </Container>
}