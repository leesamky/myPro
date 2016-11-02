const execFile=require('child_process').execFile
const child=execFile('node',['--version'],(error,stdout,stderr)=>{
    if(error){
        console.log('stderr',stderr)
        throw error
    }
    console.log('stdout',stdout)
})