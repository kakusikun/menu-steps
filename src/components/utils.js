

function matchDepValue(depValue, target) {
    let re = depValue.replace("*", "([0-9]+)")
    return target !== undefined && target.match(re) !== null
}

export {matchDepValue};