import { Component, ElementRef, AfterViewInit, ViewChild, NgZone } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'ai-robot',
  standalone: false,
  templateUrl: './ai-robot.component.html',
  styleUrl: './ai-robot.component.scss'
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 5);
    scene.add(ambientLight, directionalLight);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 1.5, 3);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(200, 200);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = false;

    const loader = new GLTFLoader();
    loader.load('assets/RobotExpressive.glb', (gltf) => {
      const model = gltf.scene;
      model.position.set(0, -1, 0);
      model.scale.set(0.6, 0.6, 0.6);
      model.position.set(0, -0.9, 0);
      camera.position.set(0, 1.5, 5);
      scene.add(model);

      model.traverse((child: any) => {
        if (child.isMesh) {
          const mesh = child as THREE.Mesh;
          const name = mesh.name;

          let color = '#3A9EFF';
          let emissive = '#000000';
          let emissiveIntensity = 0;

          if (
            name.includes('Shoulder') ||
            name.includes('Torso') ||
            name.includes('Head')
          ) {
            color = '#214D9C';
          }

          if (
            name.includes('Arm') ||
            name.includes('Leg') ||
            name.includes('Hand') ||
            name.includes('Foot')
          ) {
            color = '#B0BEC5';
          }

          if (
            name.toLowerCase().includes('chest') ||
            name.toLowerCase().includes('core') ||
            name.toLowerCase().includes('head') ||
            name.toLowerCase().includes('eye')
          ) {
            color = '#00FFF0';
            emissive = '#00FFF0';
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

      const pointLight = new THREE.PointLight('#00FFF0', 1, 5);
      pointLight.position.set(0, 1.5, 0);
      this.mixer = new THREE.AnimationMixer(model);

      gltf.animations.forEach((clip: THREE.AnimationClip) => {
        this.actions[clip.name] = this.mixer.clipAction(clip);
      });

      this.activeAction = this.actions['Idle'];
      this.activeAction.play();

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

