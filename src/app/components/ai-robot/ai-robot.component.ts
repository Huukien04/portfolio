import { Component, ElementRef, AfterViewInit, ViewChild, NgZone } from '@angular/core';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


@Component({
  selector: 'ai-robot',
  standalone: false,
  templateUrl: './ai-robot.component.html',
//   template: `<div #canvasContainer class="robot-canvas"></div>`,
styleUrl: './ai-robot.component.scss'
//   styles: [`
//     .robot-canvas {
//       width: 200px;
//       height: 200px;
//       position: fixed;
//       bottom: 16px;
//       right: 16px;
//       z-index: 20;
// 	  border: 2px solid red;
//     }
//   `]
})
export class AiRobotComponent implements AfterViewInit {
	mixer!: THREE.AnimationMixer;
actions: Record<string, THREE.AnimationAction> = {};
activeAction!: THREE.AnimationAction;

	@ViewChild('canvasContainer') canvasRef!: ElementRef;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
		if (typeof window !== 'undefined') {
			this.initThree();
		  }
    });


  }

  initThree(): void {
	const container = this.canvasRef.nativeElement;

const scene = new THREE.Scene();
scene.background = null;
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // từ 0.6 → 1
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 10, 5);
scene.add(ambientLight, directionalLight);

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camera.position.set(0, 1.5, 3);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(200, 200); // fix kích thước
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = false;

const loader = new GLTFLoader();
loader.load('assets/RobotExpressive.glb', (gltf) => {
	console.log(gltf.animations);
  const model = gltf.scene;
  console.log(model)
  model.position.set(0, -1, 0);
  model.scale.set(0.6, 0.6, 0.6);
  model.position.set(0, -0.9, 0); 
  camera.position.set(0, 1.5, 5);  
  scene.add(model);
//   model.traverse((child: any) => {
// 	if (child.isMesh) {
// 	  const material = child.material;
  
// 	  // Nếu material hỗ trợ color, thì đổi màu
// 	  if (material && material.color) {
// 		material.color.set('#00ff00'); // Màu xanh lá
// 	  }
// 	}
	
//   });
  model.traverse((child: any) => {
	if (child.isMesh) {
		const mesh = child as THREE.Mesh;
    const name = mesh.name;

    let color = '#3A9EFF'; // mặc định xanh dương sáng
    let emissive = '#000000';
    let emissiveIntensity = 0;

    if (
      name.includes('Shoulder') ||
      name.includes('Torso') ||
      name.includes('Head')
    ) {
      color = '#214D9C'; // xanh tím đậm
    }

    if (
      name.includes('Arm') ||
      name.includes('Leg') ||
      name.includes('Hand') ||
      name.includes('Foot')
    ) {
      color = '#B0BEC5'; // xám sáng
    }

    if (
      name.toLowerCase().includes('chest') ||
      name.toLowerCase().includes('core') ||
      name.toLowerCase().includes('head') ||
      name.toLowerCase().includes('eye')
    ) {
      color = '#00FFF0'; // xanh ngọc
      emissive = '#00FFF0'; // ánh sáng phát ra
      emissiveIntensity = 1;
    }

	if (
		name.toLowerCase().includes('head_3') ||
		name.toLowerCase().includes('head_4') ||
		name.toLowerCase().includes('eye')
	  ) {
		color = '#000000';
		emissive = '#000000';
		emissiveIntensity = 0;
	  }

    const material = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.6,
      roughness: 0.3,
      emissive: new THREE.Color(emissive),
      emissiveIntensity,
    });

    mesh.material = material;
	}
  });
  const pointLight = new THREE.PointLight('#00FFF0', 1, 5); // màu, cường độ, khoảng cách
pointLight.position.set(0, 1.5, 0); // điều chỉnh tùy theo vị trí lõi
this.mixer = new THREE.AnimationMixer(model);

// Lưu từng action theo tên clip
gltf.animations.forEach((clip: THREE.AnimationClip) => {
  this.actions[clip.name] = this.mixer.clipAction(clip);
});

// Phát animation Idle ban đầu
this.activeAction = this.actions['Idle'];
this.activeAction.play();

// Chuyển sang nhảy "Dance" sau 2 giây
setTimeout(() => {
  this.fadeToAction('Dance', 0.5);
}, 2000);

scene.add(pointLight);
  animate();
});
const clock = new THREE.Clock();

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  const delta = clock.getDelta();
this.mixer?.update(delta);
renderer.render(scene, camera);

};
  }
  fadeToAction(name: string, duration: number = 0.25) {
	const nextAction = this.actions[name];
	if (!nextAction || this.activeAction === nextAction) return;
  
	this.activeAction.fadeOut(duration);
	nextAction
	  .reset()
	  .setEffectiveTimeScale(1)
	  .setEffectiveWeight(1)
	  .fadeIn(duration)
	  .play();
  
	this.activeAction = nextAction;
  }
  
}

