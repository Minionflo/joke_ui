const path   = require('path')
const gi = require('node-gtk')
const Gdk = gi.require('Gdk', '3.0')
const Gtk = gi.require('Gtk', '3.0')
const got = require('got');
var config = require('./config.json');

gi.startLoop()
Gtk.init()

const gladeFile = path.join(__dirname, './1.glade')
const builder = Gtk.Builder.newFromFile(gladeFile)
const win = builder.getObject('window')

win.setDefaultSize(400, 200)
win.on('show', Gtk.main)
win.on('destroy', Gtk.mainQuit)
win.on('key-press-event', (event) => {
    if (event.keyval === Gdk.KEY_Escape) {
        win.destroy()
        return true
    }
    return false
})

const text = builder.getObject('text')
text.on('key-press-event', (event) => {
    if (event.keyval == Gdk.KEY_Return) {
        got(config.joke_server + text.text)
        win.close()
        return true
    }
    return false
})

win.showAll()