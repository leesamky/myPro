var s="2016-11-23T08:30:00Z"
var d=new Date()
var offset=d.getTimezoneOffset()
var t=new Date(s)
console.log(t.toLocaleString(),t.toLocaleString('en-GB',{hour12:false}))