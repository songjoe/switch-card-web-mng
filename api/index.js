/*
 * @Author: SongYijie
 * @Date: 2020-06-02 14:31:13
 * @LastEditors: SongYijie
 */ 
var express = require("express")

var app = express()

app.get('/login',function(req,res) {
    res.send("hello wo2rld")
})

app.listen(3001, function(){
    console.log('mock data')
})