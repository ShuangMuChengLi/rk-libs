import * as THREE from 'three';
import { OrbitControls } from './OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from './CSS3DRenderer.js';
import TWEEN from 'tween';
class Element {
  constructor (ele, x, y, z, rx, ry, rz) {
    const object = new CSS3DObject(ele);
    object.rotation.x = rx;
    object.rotation.y = ry;
    object.rotation.z = rz;
    object.position.setFromSphericalCoords(x, y, z);
    return object;
  }
}
export class ThreeSlide{
  constructor (options) {
    this.options = options;
    this.ctx = document.getElementById(this.options.target);
    this.width = this.ctx.clientWidth;
    this.height = this.ctx.clientHeight;
    this.requestAnimationFrameTimer = null;
    this.initThree();
    this.animate();
  }

  onResize() {
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }
  toggle(){
    this.controls.autoRotate = !this.controls.autoRotate;
  }
  play(){
    this.controls.autoRotate = false;
  }
  stop(){
    this.controls.autoRotate = false;
  }
  animate() {
    this.requestAnimationFrameTimer = requestAnimationFrame(()=>{
      this.animate();
    });
    this.controls.update();
    TWEEN.update();
    this.renderer.render(this.scene, this.camera);
  }
  initThree() {
    this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 1, 5000);

    this.scene = new THREE.Scene();

    this.renderer = new CSS3DRenderer();
    this.renderer.setSize(this.width, this.height);
    this.ctx.appendChild(this.renderer.domElement);

    this.group = new THREE.Group();
    this.initElement();

    this.scene.add(this.group);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.autoRotate = true;
    this.controls.enableDamping = true;
    this.controls.enableRotateY = false;
  }
  clear(){
    this.group.clear();
    this.scene.remove(this.group);
    cancelAnimationFrame(this.requestAnimationFrameTimer);
  }
  initElement(){
    this.source = document.getElementById(this.options.source);
    const elements = this.source.children;
    const sides = elements.length;
    const perAngle = Math.PI * 2 / sides;
    const l = this.width;
    let r;
    if ([Math.PI / 2, 0].includes((perAngle / 2) % Math.PI)){
      r = l / 2;
    } else {
      r = (l / 2) / Math.tan(perAngle / 2);
    }
    for (let i = 0; i < sides; i++){
      const item = [r, Math.PI / 2, perAngle * i, 0, perAngle * i, 0];
      this.group.add(new Element(elements[i].cloneNode(true), ...item));
    }
    this.scene.add(this.group);
    this.camera.position.set(0, 200, r * 3);
  }
  reload(){
    this.clear();
    this.initElement();
    this.animate();
  }
}

