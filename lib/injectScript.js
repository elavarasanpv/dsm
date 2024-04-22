const fs = require('fs')
// const execSync = require('child_process').execSync

const folders = fs.readdirSync('./src/components')

fs.writeFileSync('./dist/index.js', '//')

folders.map((folder) => {
  console.log(folder)
})

console.log(`Generated index.js`)
