import './style.css'

const terminal = new Terminal(document.getElementById('terminal')!, {
    'ssh': (args) => `Connecting to ${args}...`,
    'ls': () => 'secret.txt  readme.md',
    'rm': (args) => `Deleted ${args}`,
    // ...
})