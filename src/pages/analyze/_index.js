/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react'
import { Container, Card, CardContent, Grid, Typography, CardActions, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MiniDrawer from '../../components/miniDrawer'
import Context from '../../context'
import { useParams, useHistory } from 'react-router-dom';

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
  const [leaks, setLeaks] = useState([])
  const history = useHistory()
  const classes = useStyles();
  const title = "Analyze"

  const goBack = () => history.push('/analyze')

  const loadLeaks = async () => {
    let leakKey = `${store.pages[index]}-leak`
    let data = await localStorage.getItem(leakKey)

    if (data) {
      setLeaks(JSON.parse(data))
    }
  }

  useEffect(() => {
    loadLeaks()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Container disableGutters fixed className={classes.root}>
    <MiniDrawer isOpen={true} title={title} />
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {/* content */}
      <Grid container spacing={2}>
        <Grid item md={3}>
          <Button variant="text" onClick={goBack}>Back</Button>
        </Grid>
        <Grid item md={9} />
        <Grid item md={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">
                Application Page
              </Typography>
              <Typography variant="subtitle1">
                {store.pages[index]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">
                Memory Leak Detected
              </Typography>
              <Typography variant="subtitle1">
                {leaks.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card>
            <CardContent>
              list
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={9}>
          <Card>
            <CardContent>
              visualize
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </main>
  </Container>
}