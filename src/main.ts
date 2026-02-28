import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

document.addEventListener('click', () => {
    document.body.requestFullscreen().catch(
        (err) => console.error('Error requesting fullscreen:', err)
    )
}, { once: true })

const scene = new THREE.Scene() // vytvorim scenu
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

const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa })

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

const ceilingMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc })
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

const loader = new GLTFLoader()

loader.load('/models/Light bulb.glb', (gltf) => {
    const bulb = gltf.scene
    bulb.position.set(0, 2.5, -2.9)
    bulb.rotation.y = Math.PI / -2
    bulb.scale.set(0.05, 0.05, 0.05)
    scene.add(bulb)
})

loader.load('/models/Adjustable Desk.glb', (gltf) => {
    const desk = gltf.scene
    desk.position.set(0, 0, -2.5)
    desk.rotation.y = Math.PI / -2
    scene.add(desk)
})

loader.load('/models/Glock.glb', (gltf) => {
    const glock = gltf.scene
    glock.position.set(0.55, 0.95, -1.8)
    glock.rotation.y = Math.PI
    glock.rotation.x = Math.PI / 2
    glock.rotation.z = Math.PI / -3
    glock.scale.set(1, 1, 1)
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
