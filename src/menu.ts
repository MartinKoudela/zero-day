import './menu.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import {Terminal} from './terminal/terminal'

const terminal = new Terminal(document.getElementById('menu')!, {
    'help': () => {
        terminal.addLine('Commands:')
        terminal.addLine('  ls              - list files')
        terminal.addLine('  cat <file>      - read a file')
        terminal.addLine('  ./survival      - start survival mode')
        terminal.addLine('  ./endless       - start endless mode')
        terminal.addLine('  whoami          - show current user')
        terminal.addLine('  date            - show date and time')
        terminal.addLine('  uname           - show system information')
        terminal.addLine('  uname -a        - show system information with username')
        terminal.addLine('  ifconfig        - show network configuration')
        terminal.addLine('  hostname          - show hostname')
        terminal.addLine('  exit            - exit the terminal')
        return '  clear           - clear terminal'
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