import React, { useState } from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import AceEditor from "react-ace";
import codeAnalyzer from '../helpers/codeAnalyzer';

export default function CodeReview({ code, scriptNumber }) {
  const [markers, setMarkers] = useState([])

  const codeAnalyze = () => {
    let newMarkers = codeAnalyzer(code).map(d => ({
      startRow: d,
      endRow: d + 1,
      type: 'text',
      className: 'replacement_marker'
    }))

    setMarkers(newMarkers)
  }

  return <React.Fragment>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography>
            Code Review #{scriptNumber}
          </Typography>
        </Box>
        <Box>
          <Button variant="outlined" onClick={codeAnalyze}>
            Analyze
          </Button>
        </Box>
      </Box>
      <AceEditor
        mode="javascript"
        theme="theme-terminal"
        width="900px"
        height="300px"
        name="UNIQUE_ID_OF_DIV"
        value={code}
        markers={markers}
        editorProps={{ $blockScrolling: true }}
      />
  </React.Fragment>
}