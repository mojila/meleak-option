/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react'
import { Container, Card, CardContent, Grid, Typography, CardActions, Button, ListItem, ListItemText, List, ListSubheader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MiniDrawer from '../../components/miniDrawer'
import Context, { Actions } from '../../context'
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import Chart from "react-apexcharts";

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
  rootList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}))

export default function DetailAnalyze() {
  const { index } = useParams()
  const { store, dispatch } = useContext(Context)
  const [leaks, setLeaks] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState('')
  const history = useHistory()
  const classes = useStyles();
  const title = "Analyze"
  const [chartOptions, setChartOptions] = useState({
    options: {
      chart: {
        id: "memory-leak"
      }
    },
    series: [
      {
        type: "line",
        name: 'Heap Usage',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        type: 'line',
        name: "Leak Event",
        data: [30, 100, 45, 50, 49, 60, 70, 91]
      }
    ]
  })

  const goBack = () => history.push('/analyze')

  const loadLeaks = async () => {
    let leakKey = `${store.pages[index]}-leak`
    let data = await localStorage.getItem(leakKey)

    if (data) {
      setLeaks(JSON.parse(data))
    }

    setLoading(false)
  }

  const formatTime = (item) => {
    let start = moment(item.memoryLeak[0].time).format('DD/MM/YYYY HH:mm:ss')
    let stop = moment(item.memoryLeak[item.memoryLeak.length - 1].time).format('HH:mm:ss')

    return `${start} - ${stop}`
  }

  const onSelectItem = (item) => {
    setSelected(item)

    let heapData = item.heapData.map((d) => ({ x: moment(d.time).format('HH:mm:ss.S'), y: d.heap }))
    let memoryLeak = item.memoryLeak.map((d) => ({ x: moment(d.time).format('HH:mm:ss.S'), y: d.heap }))

    console.log(heapData, memoryLeak)

    return setChartOptions({
      options: {
        chart: {
          id: "memory-leak"
        }
      },
      markers: {
        size: [0, 7]
      },
      series: [
        {
          type: "area",
          name: 'Heap Usage',
          data: heapData,
        },
        {
          type: 'line',
          name: "Leak Event",
          data: memoryLeak
        }
      ]
    })
  }

  useEffect(() => {
    loadLeaks()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Container disableGutters fixed className={classes.root}>
    <MiniDrawer isOpen={true} title={title} />
    { !loading && <main className={classes.content}>
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
              <List className={classes.rootList} subheader={<li />}>
                {leaks.map((item, i) => (
                  <ListItem button key={i} onClick={() => onSelectItem(item)}>
                    <ListItemText secondary={formatTime(item)} />
                  </ListItem>
                ))}
              </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={9}>
            {selected 
              ? <Card>
                  <CardContent>
                    <Typography>
                      {formatTime(selected)}
                    </Typography>
                    <Chart
                      options={chartOptions.options}
                      series={chartOptions.series}
                    />
                  </CardContent>
                </Card>
              : <Card>
                  <CardContent>
                    <Typography>
                      Select Memory Leak Event
                    </Typography>
                  </CardContent>
                </Card>}
          </Grid>
        </Grid>
      </main>
    }
    </Container>
}