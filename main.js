import "./style.css"

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

renderer.render(scene, camera)