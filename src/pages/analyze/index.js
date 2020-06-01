import React, { useContext } from 'react'
import { Container, Card, CardContent, Grid, Typography, CardActions, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import MiniDrawer from '../../components/miniDrawer'
import Context from '../../context'

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

export default function Analyze() {
  const { store } = useContext(Context)
  const history = useHistory()
  const classes = useStyles();
  const title = "Analyze"

  const toDetail = (index) => {
    return history.push(`/analyze/${index}`)
  }

  return <Container disableGutters fixed className={classes.root}>
    <MiniDrawer isOpen={true} title={title} />
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {/* content */}
      <Grid container spacing={2}>
        {store.pages.map((d, i) => <Grid key={i} item md={3}>
          <Card>
            <CardContent>
              <Typography className={classes.card.title} color="textSecondary" gutterBottom>
                Page URL
              </Typography>
              <Typography>
                {new URL(d).pathname}
              </Typography>
              <Typography variant="body2" component="p"></Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => toDetail(i)}>Details</Button>
            </CardActions>
          </Card>
        </Grid>)}
      </Grid>
    </main>
  </Container>
}