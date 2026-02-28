import './loading.css'

const progressFill = document.getElementById('progress-fill')!
const progressText = document.getElementById('progress-text')!

const params = new URLSearchParams(window.location.search)
const mode = params.get('mode') || 'survival'
const BASE = import.meta.env.BASE_URL

const models = [
    'Light bulb.glb',
    'Adjustable Desk.glb',
    'Mousepad.glb',
    'Flipper.glb',
    'Mouse.glb',
    'Raspi.glb',
    'Flash.glb',
    'Wifi.glb',
    'Server1.glb',
    'Server2.glb',
    'Old server.glb',
    'laptop.glb',
    'Glock.glb',
    'Camera.glb',
    'Pc cable.glb',
    'Rf.glb',
    'Keyboard.glb',
    'Hacker laptop.glb',
    'Headphones.glb',
]

function setProgress(value: number) {
    const v = Math.min(value, 100)
    progressFill.style.width = v + '%'
    progressText.textContent = Math.round(v) + '%'
}

async function runLoading() {
    let loaded = 0

    for (const name of models) {
        await fetch(BASE + 'models/' + name)
        loaded++
        setProgress((loaded / models.length) * 100)
    }

    await new Promise(r => setTimeout(r, 300))
    window.location.href = `./game.html?mode=${mode}`
}

runLoading()
