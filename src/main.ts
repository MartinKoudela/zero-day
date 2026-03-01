import './style.css'
import * as THREE from 'three'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'

document.addEventListener('click', () => {
    document.body.requestFullscreen().catch(
        (err) => console.error('Error requesting fullscreen:', err)
    )
}, {once: true})

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0a0a0a) // nastavim background

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement // najdu canvas
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000) // nastavim kameru
const renderer = new THREE.WebGLRenderer({canvas}) // nastavim renderer
renderer.setSize(window.innerWidth, window.innerHeight)  // velikost okna

const ambientLight = new THREE.AmbientLight(0x999999)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 1, 20)
pointLight.position.set(0, 2.5, 0)
scene.add(pointLight)

const floorGeometry = new THREE.PlaneGeometry(6, 6)
const floorMaterial = new THREE.MeshStandardMaterial({color: 0x888888})
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -Math.PI / 2
floor.position.y = 0
scene.add(floor)

const wallMaterial = new THREE.MeshStandardMaterial({color: 0xaaaaaa})

const backWall = new THREE.Mesh(new THREE.PlaneGeometry(6, 3), wallMaterial)
backWall.position.set(0, 1.5, -3)
scene.add(backWall)

const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(6, 3), wallMaterial)
leftWall.position.set(-3, 1.5, 0)
leftWall.rotation.y = Math.PI / 2
scene.add(leftWall)

const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(6, 3), wallMaterial)
rightWall.position.set(3, 1.5, 0)
rightWall.rotation.y = -Math.PI / 2
scene.add(rightWall)

const frontWall = new THREE.Mesh(new THREE.PlaneGeometry(6, 3), wallMaterial)
frontWall.position.set(0, 1.5, 3)
frontWall.rotation.y = Math.PI
scene.add(frontWall)

const ceilingMaterial = new THREE.MeshStandardMaterial({color: 0xcccccc})
const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), ceilingMaterial)
ceiling.rotation.x = Math.PI / 2
ceiling.position.y = 3
scene.add(ceiling)

const deskLight = new THREE.SpotLight(0xffffff, 5, 10, Math.PI / 3)
deskLight.penumbra = 0.8
deskLight.position.set(0, 2.7, -2.9)
deskLight.target.position.set(0, 0.8, -2.5)
scene.add(deskLight)
scene.add(deskLight.target)

const BASE = import.meta.env.BASE_URL
const loader = new GLTFLoader()

loader.load(BASE + 'models/Light bulb.glb', (gltf) => {
    const bulb = gltf.scene
    bulb.position.set(0, 2.5, -2.9)
    bulb.rotation.y = Math.PI / -2
    bulb.scale.set(0.05, 0.05, 0.05)
    scene.add(bulb)
})

loader.load(BASE + 'models/Adjustable Desk.glb', (gltf) => {
    const desk = gltf.scene
    desk.position.set(0, 0, -2.5)
    desk.rotation.y = Math.PI / -2
    scene.add(desk)
})

loader.load(BASE + 'models/Mousepad.glb', (gltf) => {
    const mousepad = gltf.scene
    mousepad.position.set(0, 0.95, -2.35)
    mousepad.rotation.y = Math.PI / 0.5
    mousepad.scale.set(0.3, 0.3, 0.3)
    scene.add(mousepad)
})

loader.load(BASE + 'models/Flipper.glb', (gltf) => {
    const flipper = gltf.scene
    flipper.position.set(-0.9, 0.97, -2.2)
    flipper.rotation.y = Math.PI / -3
    flipper.scale.set(0.0015, 0.0015, 0.0015)
    scene.add(flipper)
})

loader.load(BASE + 'models/Mouse.glb', (gltf) => {
    const mouse = gltf.scene
    mouse.position.set(0.5, 0.95, -2.2)
    mouse.rotation.y = Math.PI / 2
    mouse.scale.set(0.04, 0.04, 0.04)
    scene.add(mouse)
})

loader.load(BASE + 'models/Keyboard.glb', (gltf) => {
    const keyboard = gltf.scene
    keyboard.position.set(0, 1, -2.2)
    keyboard.rotation.y = Math.PI / -0.5
    keyboard.scale.set(0.025, 0.025, 0.025)
    scene.add(keyboard)
})

loader.load(BASE + 'models/Raspi.glb', (gltf) => {
    const raspi = gltf.scene
    raspi.position.set(0.6, 1, -1.95)
    raspi.rotation.x = Math.PI / 0.5
    raspi.rotation.y = Math.PI / 7
    raspi.scale.set(0.015, 0.015, 0.015)
    scene.add(raspi)
})

loader.load(BASE + 'models/Headphones.glb', (gltf) => {
    const headphones = gltf.scene
    headphones.position.set(0.4, 1, -2.75)
    headphones.rotation.x = Math.PI / 2
    headphones.rotation.z = Math.PI / 3
    headphones.scale.set(0.0002, 0.0002, 0.0002)
    scene.add(headphones)
})

loader.load(BASE + 'models/Case.glb', (gltf) => {
    const PCcase = gltf.scene
    PCcase.position.set(-0.93, 0, -2.8)
    PCcase.rotation.x = Math.PI / -2
    PCcase.rotation.z = Math.PI
    PCcase.scale.set(0.011, 0.011, 0.011)
    scene.add(PCcase)
})


const textureLoader = new THREE.TextureLoader()

const monitorScreenTex = textureLoader.load(BASE + 'assets/textures/screen.png')
monitorScreenTex.rotation = Math.PI / 2
monitorScreenTex.center.set(0.5, 0.5)
monitorScreenTex.repeat.set(2, 2)
monitorScreenTex.offset.set(0.5, 0.1)

const curvedScreenTex = textureLoader.load(BASE + 'assets/textures/screen.png')
curvedScreenTex.rotation = -Math.PI / 2
curvedScreenTex.center.set(0.5, 0.5)
curvedScreenTex.repeat.set(2, 2)
curvedScreenTex.offset.set(0.9, -0.28)

const laptopScreenTex = textureLoader.load(BASE + 'assets/textures/laptop-screen.jpg')
laptopScreenTex.rotation = Math.PI / -0.5
laptopScreenTex.center.set(1, 1)
laptopScreenTex.repeat.set(2, 2)
laptopScreenTex.offset.set(0.1, -0.1)

loader.load(BASE + 'models/Monitor.glb', (gltf) => {
    const monitor = gltf.scene
    monitor.position.set(-0.6, 1, -2.8)
    monitor.rotation.y = Math.PI / -2.3
    monitor.scale.set(0.0012, 0.0012, 0.0012)
    monitor.traverse((child) => {
        if (child instanceof THREE.Mesh && child.name === 'group_0002_layar_0') {
            child.material = new THREE.MeshBasicMaterial({map: monitorScreenTex})
        }
    })
    scene.add(monitor)
})

loader.load(BASE + 'models/Curved monitor.glb', (gltf) => {
    const curved = gltf.scene
    curved.position.set(0.4, 0.9, -2.2)
    curved.rotation.y = Math.PI / -4
    curved.scale.set(0.09, 0.09, 0.09)
    curved.traverse((child) => {
        if (child instanceof THREE.Mesh && child.name === 'Object_5') {
            child.material = new THREE.MeshBasicMaterial({map: curvedScreenTex, color: 0x666666})
        }
    })
    scene.add(curved)
})

loader.load(BASE + 'models/laptop.glb', (gltf) => {
    const laptop = gltf.scene
    laptop.position.set(-0.5, 1, -2.35)
    laptop.rotation.y = Math.PI / -0.55
    laptop.scale.set(0.015, 0.015, 0.015)

    laptop.traverse((child) => {
        if (child instanceof THREE.Mesh && child.name === 'Screen_ComputerScreen_0') {
            child.material = new THREE.MeshBasicMaterial({map: laptopScreenTex, color: 0x999999})
        }
    })

    scene.add(laptop)
})

loader.load(BASE + 'models/Rf.glb', (gltf) => {
    const rf = gltf.scene
    rf.position.set(0.8, 1, -1.7)
    rf.rotation.x = Math.PI / 0.5
    rf.rotation.y = Math.PI / -9
    rf.scale.set(0.05, 0.05, 0.05)
    scene.add(rf)
})

loader.load(BASE + 'models/Pc cable.glb', (gltf) => {
    const cable = gltf.scene
    cable.position.set(0.1, 1, -2.7)
    cable.rotation.x = Math.PI
    cable.rotation.y = Math.PI / -0.5
    cable.scale.set(0.015, 0.015, 0.015)
    scene.add(cable)
})

loader.load(BASE + 'models/Camera.glb', (gltf) => {
    const camera = gltf.scene
    camera.position.set(-2.5, 2.95, -2.83)
    camera.rotation.x = Math.PI / -1
    camera.rotation.y = Math.PI / 1.4
    camera.scale.set(0.08, 0.08, 0.08)
    scene.add(camera)
})


loader.load(BASE + 'models/Flash.glb', (gltf) => {
    const flash = gltf.scene
    flash.position.set(0.8, 1, -1.8)
    flash.rotation.x = Math.PI / 0.5
    flash.rotation.y = Math.PI / -7
    flash.scale.set(0.0002, 0.0002, 0.0002)
    scene.add(flash)
})

loader.load(BASE + 'models/Wifi.glb', (gltf) => {
    const wifi = gltf.scene
    wifi.position.set(0.8, 0.9, -2.9)
    wifi.rotation.x = Math.PI / -0.5
    wifi.scale.set(1, 1, 1)
    scene.add(wifi)
})

loader.load(BASE + 'models/Server1.glb', (gltf) => {
    const server1 = gltf.scene
    server1.position.set(3, 0, -2.35)
    server1.rotation.y = Math.PI
    server1.scale.set(0.4, 0.4, 0.4)
    scene.add(server1)
})

loader.load(BASE + 'models/Server2.glb', (gltf) => {
    const server2 = gltf.scene
    server2.position.set(2.7, 0, -1.5)
    server2.rotation.y = Math.PI / -2
    server2.scale.set(0.8, 0.8, 0.8)
    scene.add(server2)
})

loader.load(BASE + 'models/Server2.glb', (gltf) => {
    const server2 = gltf.scene
    server2.position.set(2.75, 0, -0.8)
    server2.rotation.y = Math.PI / -2
    server2.scale.set(0.8, 0.8, 0.8)
    scene.add(server2)
})

loader.load(BASE + 'models/Old server.glb', (gltf) => {
    const server2 = gltf.scene
    server2.position.set(2.9, 0, 0)
    server2.rotation.y = Math.PI
    server2.scale.set(0.4, 0.4, 0.4)
    scene.add(server2)
})

loader.load(BASE + 'models/Glock.glb', (gltf) => {
    const glock = gltf.scene
    glock.position.set(0.55, 0.95, -1.9)
    glock.rotation.y = Math.PI
    glock.rotation.x = Math.PI / 2
    glock.rotation.z = Math.PI / -3
    glock.scale.set(1.2, 1.2, 1.2)
    scene.add(glock)
})

camera.position.set(0, 1.5, -1.5) // pozice kamery

let targetRotationY = 0
let targetRotationX = 0
const maxRotationY = Math.PI * 0.9
const maxRotationX = Math.PI * 0.15

document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1
    const mouseY = (e.clientY / window.innerHeight) * 2 - 1

    targetRotationY = -mouseX * maxRotationY
    targetRotationX = -mouseY * maxRotationX
})

function animate() {
    requestAnimationFrame(animate)

    camera.rotation.y += (targetRotationY - camera.rotation.y) * 0.05
    camera.rotation.x += (targetRotationX - camera.rotation.x) * 0.05

    renderer.render(scene, camera)
}

animate()

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})
