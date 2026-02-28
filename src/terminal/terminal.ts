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
        this.promptEl.textContent = '> '
        this.addLine('Enter your username:')

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

    clear() {
        this.outputEl.innerHTML = ''
    }

    private handleCommand(input: string) {
        const cmd = input.trim().toLowerCase()

        if (!this.username) {
            this.username = cmd
            this.addLine(`> ${this.username}`)
            this.addLine(`Welcome, ${this.username}`)
            this.addLine('Type "help" for available commands.')
            this.promptEl.textContent = `${this.username}@L0k1:~$ `
            return
        }

        if (!cmd) return

        this.addLine(`${this.username}@L0k1:~$ ${cmd}`)

        const action = this.commands[cmd]

        if (cmd === 'whoami') {
            this.addLine(this.username)
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