import './terminal.css'

export class Terminal {

    private outputEl: HTMLDivElement
    private inputEl: HTMLInputElement
    private commands: Record<string, (args: string) => string>
    private username: string | null = null
    private promptEl: HTMLSpanElement

    constructor(container: HTMLElement, commands: Record<string, (args: string)
        => string>) {
        const time = new Date().toLocaleString()

        this.commands = commands

        this.outputEl = document.createElement('div')
        this.outputEl.id = 'terminal-output'

        const loginDiv = document.createElement('p')
        loginDiv.id = 'login-div'
        loginDiv.textContent = `Last login: ${time}`
        this.outputEl.appendChild(loginDiv)

        container.appendChild(this.outputEl)

        const inputLine = document.createElement('div')
        inputLine.id = 'terminal-input-line'

        const prompt = document.createElement('span')
        this.promptEl = prompt
        const savedUsername = sessionStorage.getItem('l0k1-username')
        if (savedUsername) {
            this.username = savedUsername
            this.promptEl.textContent = `${this.username}@L0k1:~$ `
            this.addLine(`Welcome back, ${this.username}`)
            this.addLine('Type "help" for available commands.')
        } else {
            this.promptEl.textContent = '> '
            this.addLine('Enter your username:')
        }

        this.inputEl = document.createElement('input')
        this.inputEl.type = 'text'
        this.inputEl.id = 'terminal-input'
        this.inputEl.autofocus = true


        inputLine.appendChild(prompt)
        inputLine.appendChild(this.inputEl)
        container.appendChild(inputLine)

        this.inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleCommand(this.inputEl.value)
                this.inputEl.value = ''
            }
        })
    }

    addLine(text: string) {
        const line = document.createElement('p')
        line.textContent = text
        this.outputEl.appendChild(line)

        this.outputEl.scrollTop = this.outputEl.scrollHeight
    }

    private handleCommand(input: string) {
        const cmd = input.trim().toLowerCase()

        if (!this.username) {
            this.username = cmd
            this.addLine(`> ${this.username}`)
            this.addLine(`Welcome, ${this.username}`)
            this.addLine('Type "help" for available commands.')
            this.promptEl.textContent = `${this.username}@L0k1:~$ `
            sessionStorage.setItem('l0k1-username', this.username)
            return
        }

        if (!cmd) return

        this.addLine(`${this.username}@L0k1:~$ ${cmd}`)

        const action = this.commands[cmd]

        //Commands
        if (cmd === 'whoami') {
            this.addLine(this.username)
            return
        }

        if (cmd === 'clear') {
            this.outputEl.innerHTML = ''
            return
        }

        if (cmd === 'ifconfig') {
            this.addLine('eth0: 192.168.1.105  netmask 255.255.255.0')
            return
        }

        if (cmd === 'exit') {
            this.addLine('There is no escape.')
            return
        }

        if (cmd === 'date') {
            this.addLine(new Date().toLocaleString())
            return
        }

        if (cmd === 'hostname') {
            this.addLine(this.username + '-node.local')
            return
        }

        if (cmd === 'uname') {
            this.addLine('L0K1 OS 1.0.0 x86_64')
            return
        }

        if (cmd === 'uname -a') {
            this.addLine('L0K1 OS 1.0.0 ' + this.username + '-node x86_64 GNU/Linux')
            return
        }

        if (cmd === 'id') {
            this.addLine(`uid=1000(${this.username}) gid=1000(${this.username})
  groups=1000(${this.username}),27(sudo)`)
            return
        }

        if (cmd === 'uptime') {
            this.addLine(`up ${Math.floor(Math.random() * 365)} days,
  ${Math.floor(Math.random() * 24)}:${String(Math.floor(Math.random() *
                60)).padStart(2, '0')}`)
            return
        }

        if (cmd === 'pwd') {
            this.addLine('/home/' + this.username)
            return
        }

        if (cmd === 'sudo') {
            this.addLine('Nice try.')
            return
        }

        if (cmd === 'neofetch') {
            const logo = [
                '  ██╗      ██████╗ ██╗  ██╗ ██╗',
                '  ██║     ██╔═══██╗██║ ██╔╝███║',
                '  ██║     ██║   ██║█████╔╝ ╚██║',
                '  ██║     ██║   ██║██╔═██╗  ██║',
                '  ███████╗╚██████╔╝██║  ██╗ ██║',
                '  ╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═╝',
            ]
            logo.forEach(line => {
                const p = document.createElement('p')
                p.textContent = line
                p.classList.add('neofetch-logo')
                this.outputEl.appendChild(p)
            })
            this.addLine('')
            this.addLine('OS: L0K1 OS 1.0.0 x86_64')
            this.addLine('Host: ' + this.username + '-node')
            this.addLine('Kernel: 6.1.0-l0k1')
            this.addLine('Shell: l0k1-sh 1.0')
            this.addLine('Terminal: L0K1 Terminal')
            return
        }

        if (action) {
            const response = action(cmd)
            if (response) this.addLine(response)
        } else {
            this.addLine('Command not found: ' + cmd + '. Type "help" for commands.')
        }
    }
}