import './menu.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Terminal } from './terminal/terminal'

const terminal = new Terminal(document.getElementById('menu')!, {
    'help': () => 'Commands: play survival, play endless, how to play, settings',
    'play survival': () => { window.location.href = '/game.html?mode=survival';
        return 'Loading...' },
    // ...
})