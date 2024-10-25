const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Обслуживание статических файлов из папки public
app.use(express.static('public'));

// Обработка событий подключения и отключения
io.on('connection', (socket) => {
    console.log('A user connected');

    // Обработка пользовательских сообщений
    socket.on('chat message', (msg) => {
        console.log('Message received: ' + msg);
        // Отправка подтверждения обратно клиенту
        socket.emit('message received', 'Message received: ' + msg);
    });

    // Обработка отключения
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Запуск сервера
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
