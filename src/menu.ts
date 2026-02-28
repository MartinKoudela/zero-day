import './menu.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import {Terminal} from './terminal/terminal'

const terminal = new Terminal(document.getElementById('menu')!, {
    'help': () => {
        terminal.addLine('=== Important ===')
        terminal.addLine('  ./survival      - start survival mode')
        terminal.addLine('  ./endless       - start endless mode')
        terminal.addLine('  cat readme      - how to play')
        terminal.addLine('')
        terminal.addLine('=== FILES ===')
        terminal.addLine('  ls              - list files')
        terminal.addLine('  cat <file>      - read a file')
        terminal.addLine('')
        terminal.addLine('=== SYSTEM ===')
        terminal.addLine('  whoami          - show current user')
        terminal.addLine('  hostname        - show hostname')
        terminal.addLine('  pwd             - print working directory')
        terminal.addLine('  date            - show date and time')
        terminal.addLine('  uptime          - show system uptime')
        terminal.addLine('  uname           - show system info')
        terminal.addLine('  uname -a        - show full system info')
        terminal.addLine('  id              - show user id')
        terminal.addLine('  ifconfig        - show network config')
        terminal.addLine('  neofetch        - show system overview')
        terminal.addLine('')
        terminal.addLine('=== OTHER ===')
        terminal.addLine('  clear           - clear terminal')
        terminal.addLine('  exit            - exit terminal')
        return '  help            - show this message'
    },
    'ls': () => {
        terminal.addLine('readme')
        terminal.addLine('settings')
        terminal.addLine('survival')
        terminal.addLine('endless')
        return 'fsoceity'
    },

    './survival': () => {
        window.location.href = '/game.html?mode=survival'
        return 'Loading survival mode...'
    },
    './endless': () => {
        // window.location.href = '/game.html?mode=endless'
        // return 'Loading endless mode...'
        return 'Coming soon...'
    },
    'cat readme': () => {
        terminal.addLine('You are a hacker. Clients give you quests.')
        terminal.addLine('Use real terminal commands to complete them.')
        terminal.addLine('Watch your back - if they find you, it\'s over.')
        return 'Type "help" to see all available commands.'
    },
    'settings': () => {
        return 'Settings: coming soon'
    },

    'cat fsoceity': () => 'We are watching you.'
})