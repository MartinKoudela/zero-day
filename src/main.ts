import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0a0a0a)

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight)

const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 1, 20)
pointLight.position.set(0, 2.5, 0)
scene.add(pointLight)

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

const floorGeometry = new THREE.PlaneGeometry(6, 6)
const floorMaterial = new THREE.MeshStandardMaterial({color: 0x1a1a1a})
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.position.y = 0
scene.add(floor)


camera.position.set(0, 1.5, 3)
camera.lookAt(0, 0, 0)
