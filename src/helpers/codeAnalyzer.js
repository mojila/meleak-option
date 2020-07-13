function detectVariableName(variables) {
  let results = []

  results = variables.map(d => {
    const removeDeclaration = d.declarationSyntax.replace(/let|const|var/g,'')
    let name = removeDeclaration
    
    if (d.value) {
      name = name.substring(0, name.search(/=/g)).replace(/ /g, '')
    } else {
      name = name.replace(/ /g, '')
    }

    d.name = name

    return d
  })

  return results
}

function detectDataType(variables) {
  let results = []

  results = variables.map(d => {
    let assignLocation = d.declarationSyntax.search(/=/g)

    if (assignLocation !== -1) {
      let data = d.declarationSyntax.substring(assignLocation, d.declarationSyntax.length).replace(/[= ]/g,'')
      let value = null
      if (Number(data)) {
        value = Number(data)
        d.typeData = typeof(value)
      } else if (data.search(/['"`]/g) !== -1) {
        value = String(data).replace(/['"`]/g, '')
        d.typeData = typeof(value)
      } else if (data.search(/[function]/g) !== -1) {
        value = String(data)
        d.typeData = 'function'
      } else if (data.search(/[{]|[}]/g) !== -1) {
        value = data
        d.typeData = 'object'
      }

      d.value = value
    }

    return d
  });

  return results
}

function searchVariable(code) {
  let results = []
  const variableDatasetRegex = [
    /var [a-zA-Z0-9_ = {a-zA-Z0-9:'",}']{3,}/g,
    /let [a-zA-Z0-9_ = {a-zA-Z0-9:'",}']{3,}/g,
    /const [a-zA-Z0-9_ = {a-zA-Z0-9:'",}']{3,}/g,
  ]

  variableDatasetRegex.forEach((value, index) => {
    let detectedVariables = code.match(value)

    if (detectedVariables) {
      results = [...results, ...detectedVariables.map((d) => {
        return {
          declarationSyntax: d,
          name: '',
          typeData: null,
          value: null
        }
      })]
    }
  })

  // detect data type
  results = detectDataType(results)
  // detect variable name
  results = detectVariableName(results)

  return results
}

function detectSingleDataType(data) {
  let value = null
  
  if (Number(data)) {
    value = typeof(Number(data))
  } else if (data.search(/['"`]/g) !== -1) {
    value = typeof(String(data).replace(/['"`]/g, ''))
  } else if (data.search(/[function]/g) !== -1) {
    value = 'function'
  } else if (data.search(/[{]|[}]/g) !== -1) {
    value = 'object'
  }

  return value
}

function findArrayPush(code, variables) {
  let results = []

  let filteredFromDeclarations = code.split('\n')
  filteredFromDeclarations = filteredFromDeclarations.map(d => {
    let declarations = false
    
    variables.forEach(value => {
      if (d.search(value.declarationSyntax) >= 0) {
        declarations = true
      }
    })

    if (!declarations) {
      return d
    }

    return ''
  })

  results = filteredFromDeclarations.map((d, i) => {
    let problemSyntax = false

    variables.forEach(value => {
      if (d.search('.push') !== -1) {
        problemSyntax = true
      }
    })
    
    if (!problemSyntax) {
      return 0
    } else {
      return i
    }
  })
  
  return results
}

function detectProblemCode(code, variables) {
  let results = []

  let filteredFromDeclarations = code.split('\n')
  filteredFromDeclarations = filteredFromDeclarations.map(d => {
    let declarations = false
    
    variables.forEach(value => {
      if (d.search(value.declarationSyntax) >= 0) {
        declarations = true
      }
    })

    if (!declarations) {
      return d
    }

    return ''
  })

  results = filteredFromDeclarations.map((d, i) => {
    let problemSyntax = false

    variables.forEach(value => {
      const gex = new RegExp(`(${value.name}+[ +-=])`, 'g')
      if (d.search(gex) !== -1) {
        let data = d.substring(d.search('=') + 1, d.length).replace(/ /g,'')
        
        if (detectSingleDataType(data) !== value.typeData) {
          problemSyntax = true
        }
      }
    })
    
    if (!problemSyntax) {
      return 0
    } else {
      return i
    }
  })

  results = [...results, ...findArrayPush(code, variables)]
  results = results.filter(x => x !== 0)

  return results
}

function codeAnalyzer(beautifiedCode) {
  const variablesFound = searchVariable(beautifiedCode)
  const problemCode = detectProblemCode(beautifiedCode, variablesFound)

  return problemCode
}

export default codeAnalyzer