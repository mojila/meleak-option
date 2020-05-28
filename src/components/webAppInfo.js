import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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

export default function WebAppInfo() {
  const classes = useStyles();
  const { store } = useContext(Context)

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Web Apps Information
        </Typography>
        <Typography variant="h5" component="h2">
          {store.info.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {store.info.url}
        </Typography>
        <Typography variant="body2" component="p">
          
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component="a" href={store.info.url} target="_blank">Go to app</Button>
      </CardActions>
    </Card>
  );
}
