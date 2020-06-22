import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Context from '../context';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CurrentStats() {
  const classes = useStyles();
  const history = useHistory();
  const { store } = useContext(Context)
  
  const totalPage = () => store.pages.length
  const totalLeaks = () => store.leaks.length

  const goToAnalyze = () => {
    history.push('/analyze')
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container>
          <Grid item md={12}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Current Stats
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Typography variant="button" gutterBottom>
              Total Page Scanned
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Typography variant="button" gutterBottom>
              Total Memory Leak Pattern Found
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Typography variant="h4" gutterBottom>
              {totalPage()}
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Typography variant="h4" gutterBottom>
              {totalLeaks()}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={goToAnalyze}>Go to Analyze</Button>
      </CardActions>
    </Card>
  );
}
