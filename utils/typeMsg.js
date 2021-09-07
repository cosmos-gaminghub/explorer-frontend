const getMinSelfDelegation = (key, value, eventObj) => {
  let rateValue = value
  if (rateValue === null) {
    rateValue = 0
    for (const kEvent in eventObj) {
      if (eventObj[kEvent].Type === 'edit_validator' && eventObj[kEvent].Attributes) {
        const attributes = eventObj[kEvent].Attributes
        for (const kAttrEV in attributes) {
          const attributeObj = attributes[kAttrEV]
          if (attributeObj.Key && attributeObj.Key.toLowerCase() === key.toLowerCase()) {
            rateValue = attributeObj.Value
            break
          }
        }
      }
    }
  }
  const title = 'Min Self Delegation'
  const details = rateValue
  return { title, details }
}

const getCommissionRate = (key, value, eventObj) => {
  let rateValue = value
  if (rateValue === null) {
    rateValue = 0
    for (const kEvent in eventObj) {
      if (eventObj[kEvent].Type === 'edit_validator' && eventObj[kEvent].Attributes) {
        const arrRs = getArrayFromEventsObj(eventObj[kEvent].Attributes, key)
        for (const kArrRs in arrRs) {
          if (arrRs[kArrRs].key === 'rate') {
            rateValue = parseFloat(arrRs[kArrRs].value)
          }
        }
      }
    }
  }
  const title = 'Commission Rate'
  const details = ((parseFloat(rateValue) * Math.pow(10, 2)).toFixed(2)) + '%'
  return { title, details }
}

const getArrayFromEventsObj = (attributes, key) => {
  // eslint-disable-next-line prefer-const
  let data = []
  for (const kAttrEV in attributes) {
    const attributeObj = attributes[kAttrEV]
    if (attributeObj.Key && attributeObj.Key.toLowerCase() === key.toLowerCase() && attributeObj.Value) {
      const attributeArr = attributeObj.Value.split('\n  ')
      for (const kAtrr in attributeArr) {
        const arrKeyValue = attributeArr[kAtrr].split(': ')
        if (arrKeyValue.length > 1) {
          data.push({
            key: arrKeyValue[0],
            value: arrKeyValue[1].replaceAll('\\"', '').replaceAll('"', '')
          })
        }
      }
      break
    }
  }
  return data
}

export default { getCommissionRate, getMinSelfDelegation }
