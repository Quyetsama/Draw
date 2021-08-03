const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)


app.use(express.static('public'))
app.set("view engine", "ejs");


app.get('/', (req, res, next) => {
    res.render('home')
})

server.listen(process.env.PORT, function(){
    console.log("Server is running!!!");
});


io.on('connection', (socket) => {
    console.log('Client connected: ' + socket.id)
    socket.on('mouse', (data) => {
        console.log(data)
        socket.broadcast.emit('mouse', data)
    })
    socket.on('disconnect', () => console.log('Client has disconnected'))
})