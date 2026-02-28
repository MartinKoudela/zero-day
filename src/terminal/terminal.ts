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

    getUsername(): string | null {
        return this.username
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
        if (action) {
            const response = action(cmd)
            if (response) this.addLine(response)
            return
        }

        if (cmd.startsWith('cat ')) {
            const file = cmd.slice(4)
            const catAction = this.commands['cat ' + file]
            if (catAction) {
                const response = catAction(file)
                if (response) this.addLine(response)
            } else {
                this.addLine(`cat: ${file}: No such file or directory`)
            }
            return
        }

        if (cmd === 'whoami') {
            this.addLine(this.username)
            return
        }

        if (cmd === 'clear') {
            this.outputEl.innerHTML = ''
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

        if (cmd === 'pwd') {
            this.addLine('/home/' + this.username)
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
            this.addLine(`uid=1000(${this.username}) gid=1000(${this.username}) groups=1000(${this.username}),27(sudo)`)
            return
        }

        if (cmd === 'uptime') {
            const days = Math.floor(Math.random() * 365)
            const hours = Math.floor(Math.random() * 24)
            const mins = String(Math.floor(Math.random() * 60)).padStart(2, '0')
            this.addLine(`up ${days} days, ${hours}:${mins}`)
            return
        }

        if (cmd === 'ifconfig') {
            this.addLine('eth0: 192.168.1.105  netmask 255.255.255.0')
            return
        }

        if (cmd === 'netstat') {
            this.addLine('Active connections:')
            this.addLine('tcp  0  0  192.168.1.105:22    ESTABLISHED')
            this.addLine('tcp  0  0  192.168.1.105:443   LISTEN')
            this.addLine('tcp  0  0  192.168.1.105:80    LISTEN')
            return
        }

        if (cmd === 'sudo' || cmd.startsWith('sudo ')) {
            this.addLine('Nice try.')
            return
        }

        if (cmd === 'su root') {
            this.addLine('Nice try.')
            return
        }

        if (cmd === 'exit') {
            this.addLine('There is no escape.')
            return
        }

        if (cmd.startsWith('echo ')) {
            this.addLine(cmd.slice(5))
            return
        }

        if (cmd === 'rm -rf /') {
            this.addLine('Nice try. System protected.')
            return
        }

        if (cmd === ':q' || cmd === ':q!' || cmd === ':wq') {
            this.addLine('This is not vim.')
            return
        }

        if (cmd === 'history') {
            this.addLine('Command history disabled for security.')
            return
        }

        if (cmd === 'top' || cmd === 'htop') {
            this.addLine('PID   CPU%  MEM%  COMMAND')
            this.addLine('1     0.1   0.4   systemd')
            this.addLine('42    0.0   0.1   cron')
            this.addLine('289   0.0   0.1   sshd')
            this.addLine('142   2.3   1.2   l0k1-terminal')
            this.addLine('187   0.0   0.2   tor-relay')
            this.addLine('203   0.1   0.3   vpn-tunnel')
            this.addLine('256   8.7   4.1   bruteforce.sh')
            this.addLine('301   45.2  12.8  crypto-miner  <== suspicious')
            this.addLine('404   0.0   0.0   [hidden]')
            this.addLine('289   0.0   0.5   keylogger')
            this.addLine('333   0.0   0.1   rootkit-loader')
            this.addLine('666   6.6   6.6   ???')
            return
        }

        if (cmd === 'ps' || cmd === 'ps aux') {
            this.addLine('PID  TTY   TIME     CMD')
            this.addLine('1    pts/0 00:00:01 systemd')
            this.addLine('42   pts/0 00:00:00 cron')
            this.addLine('89   pts/0 00:00:03 sshd')
            this.addLine('142  pts/0 00:00:12 l0k1-terminal')
            this.addLine('187  pts/0 00:00:45 tor-relay')
            this.addLine('203  pts/0 00:00:22 vpn-tunnel')
            this.addLine('256  pts/0 00:03:17 bruteforce.sh')
            this.addLine('289  pts/0 00:00:08 keylogger')
            this.addLine('301  pts/0 00:15:42 crypto-miner')
            this.addLine('333  pts/0 00:00:01 rootkit-loader')
            return
        }

        if (cmd === 'free' || cmd === 'free -h') {
            this.addLine('               total   used    free    shared  cache')
            this.addLine('Mem:           16Gi    8.2Gi   3.1Gi   0.5Gi   4.7Gi')
            this.addLine('Swap:          2Gi     1.8Gi   0.2Gi')
            this.addLine('')
            this.addLine('WARNING: High swap usage detected. Possible memory leak.')
            return
        }

        if (cmd === 'df' || cmd === 'df -h') {
            this.addLine('Filesystem  Size  Used  Avail  Use%  Mounted on')
            this.addLine('/dev/sda1   500G  234G  266G   47%   /')
            this.addLine('/dev/sda2   100G  98G   2G     98%   /var/log')
            this.addLine('/dev/sdb1   1T    890G  110G   89%   /data')
            this.addLine('tmpfs       8G    4.2G  3.8G   53%   /tmp')
            this.addLine('')
            this.addLine('WARNING: /var/log almost full. Someone is watching.')
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

        for (const key of Object.keys(this.commands)) {
            if (cmd.startsWith(key + ' ') || cmd === key) {
                const args = cmd.slice(key.length + 1)
                const response = this.commands[key](args)
                if (response) this.addLine(response)
                return
            }
        }

        this.addLine('Command not found: ' + cmd + '. Type "help" for commands.')
    }
}
