/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react'
import { Container, Card, CardContent, Grid, Typography, CardActions, Button, ListItem, ListItemText, List, ListSubheader, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MiniDrawer from '../../components/miniDrawer'
import Context, { Actions } from '../../context'
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import Chart from "react-apexcharts";
import AceEditor from "react-ace";
import { js_beautify } from 'js-beautify'

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
  const { store } = useContext(Context)
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
    series: []
  })

  const goBack = () => history.push('/analyze')
  const pageUrl = () => store.pages[index]
  const totalLeaks = () => {
    let pageLeaks = store.page_leaks.filter(x => x.page === pageUrl())[0]
    if (pageLeaks) return pageLeaks.leaks.length

    return 0
  }
  const getLeaks = () => {
    let pageLeaks = store.page_leaks.filter(x => x.page === pageUrl())[0]
    if (pageLeaks) return pageLeaks.leaks

    return []
  }
  const getScripts = () => {
    let pageScripts = store.page_scripts.filter(x => x.page === pageUrl())[0]
    if (pageScripts) return pageScripts.scripts

    return []
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

    return setChartOptions({
      options: {
        chart: {
          id: "memory-leak"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        annotations: {
          yaxis: [
            {
              y: memoryLeak[0].y,
              y2: memoryLeak[memoryLeak.length - 1].y,
              borderColor: '#000',
              fillColor: '#FEB019',
              label: {
                text: 'Memory Leak'
              }
            }
          ],
          xaxis: [
            {
              x: memoryLeak[0].x,
              x2: memoryLeak[memoryLeak.length - 1].x,
              fillColor: '#FEB019',
              opacity: 0.4,
              label: {
                borderColor: '#B3F7CA',
                style: {
                  fontSize: '10px',
                  color: '#fff',
                  background: '#00E396',
                }
              },
              text: 'Memory Leak Event Range',
            }
          ]
        },
      }, 
      series: [
        {
          type: "area",
          name: 'Heap Usage',
          data: heapData,
        }
      ]
    })
  }

  useEffect(() => {
    // loadLeaks()
    setLoading(false)
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
                  {pageUrl()}
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
                  {totalLeaks()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={3}>
            <Card>
              <CardContent>
              <List className={classes.rootList} subheader={<li />}>
                {getLeaks().map((item, i) => (
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
                      type="area"
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
          <Grid item md={12}>
            <Card>
              <CardContent>
                { getScripts().map((d, i) => <div key={i}>
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography>
                        Code #{i+1} Review
                      </Typography>
                    </Box>
                    <Box>
                      <Button variant="outlined">Analyze</Button>
                    </Box>
                  </Box>
                  <AceEditor
                    mode="javascript"
                    theme="theme-terminal"
                    width="900px"
                    height="300px"
                    name="UNIQUE_ID_OF_DIV"
                    value={d}
                    editorProps={{ $blockScrolling: true }}
                  />
                </div>) }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
    }
    </Container>
}