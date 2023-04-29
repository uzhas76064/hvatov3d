import "./style.css"
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import * as THREE from "three"

// Создаем сцену
const scene = new THREE.Scene();

// Создаем камеру
// Первый параметр - угол обзора,
// второй параметр - соотношение сторон экрана,
// третий и четвертый - начальное и конечное расстояние до объектов
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Создаем рендерер
// Указываем, что рендер нужно выводить на канвас с id "bg"
const renderer = new THREE.WebGL1Renderer({
    canvas: document.getElementById('bg'),
});

// Устанавливаем плотность пикселей для устройства
renderer.setPixelRatio(window.devicePixelRatio);

// Устанавливаем размеры рендерера
renderer.setSize(window.innerWidth, window.innerHeight);

// Устанавливаем позицию камеры вдоль оси Z
camera.position.setZ(30);

// Создаем геометрию, в данном случае - тор
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// Создаем материал для тора, в данном случае - желтый цвет
const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });

// Создаем объект Mesh используя геометрию и материал, затем добавляем его в сцену
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Создаем и добавляем в сцену точечный и окружающий свет
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Создаем и добавляем в сцену помощники точечного света и сетку
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Создаем OrbitControls - объект для управления камерой, затем добавляем его в сцену
const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25,24,24)
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    const star = new THREE.Mesh(geometry, material)

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x,y,z)
    scene.add(star)
}

Array(200).fill().forEach(addStar)
const spaceTexture = new THREE.TextureLoader().load('./images/space.jpg')
scene.background = spaceTexture


// Moon
const moonTexture = new THREE.TextureLoader().load('./images/moon.jpg')
const normalTexture = new THREE.TextureLoader().load('./images/normal.jpg')

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture
    })
)

scene.add(moon)

// Функция для анимации объекта, в данном случае - поворот тора и обновление OrbitControls
function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    torus.rotation.z += 0.01;

    controls.update(); // обновляем состояние камеры в зависимости от перемещений мыши

    renderer.render(scene, camera); // рендерим сцену с помощью заданных ранее камеры и рендерера
}

// Запускаем анимацию
animate();