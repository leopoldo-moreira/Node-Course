const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('enterPressed', () => {
    console.log('Enter pressed')
})

eventEmitter.on('enterPressed', () => {
    console.log('Enter pressed and registred!')
})

eventEmitter.emit('enterPressed')