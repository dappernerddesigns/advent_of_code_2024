const testLists = `3   4
4   3
2   5
1   3
3   9
3   3`
// part one
const totalDistance =(ids)=>{
    const rows = ids.split('\n')
const leftCol = []
const rightCol =[]
    for(let i=0; i<rows.length;i++){
const [left,right]=rows[i].split(/\s+/)
leftCol.push(+left)
rightCol.push(+right)
    }

    const leftSorted = leftCol.sort((a,b)=>a-b)
    const rightSorted = rightCol.sort((a,b)=>a-b)

    let distance = 0
    leftSorted.forEach((id,i)=>{
        const largest = Math.max(id, rightSorted[i])
        const smallest = Math.min(id, rightSorted[i])
        distance += largest-smallest
    })
return distance
}

const fs = require('fs')
const input = fs.readFileSync('./inputs/01.txt','utf-8')

totalDistance(input)