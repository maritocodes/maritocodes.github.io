import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";
import { useLoading } from "../LoadingContext";

interface Props {
  delay: number;
  model: string;
  animationIndex?: number;
  scale?: number;
  width?: number;
  height?: number;
  cameraPosition?: { x: number; y: number; z: number };
  cameraTarget?: { x: number; y: number; z: number };
  orthoSize?: number;
}

const ThreeModel = ({
  delay,
  model,
  animationIndex = 0,
  scale = 1,
  width = 400,
  height = 400,
  cameraPosition = { x: 3, y: 1.5, z: 3 },
  cameraTarget = { x: 0, y: 1, z: 0 },
  orthoSize = 2,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<(() => void) | null>(null);
  const { register } = useLoading();

  // This runs during render, but the null-check means it only registers ONCE
  // even across StrictMode double-renders, because the ref persists
  if (doneRef.current === null) {
    doneRef.current = register(model);
  }

  useEffect(() => {
    if (!containerRef.current) return;

    let animFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;
    let timeoutId: ReturnType<typeof setTimeout>;
    let disposed = false;

    const scene = new THREE.Scene();
    const aspect = width / height;
    const cameraObj = new THREE.OrthographicCamera(
      -orthoSize * aspect,
      orthoSize * aspect,
      orthoSize,
      -orthoSize,
      0.1,
      100,
    );
    cameraObj.position.set(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z,
    );
    cameraObj.lookAt(cameraTarget.x, cameraTarget.y, cameraTarget.z);
    scene.add(cameraObj);
    scene.add(new THREE.DirectionalLight(0xffffff, 1));
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const loader = new GLTFLoader();
    let mixer: THREE.AnimationMixer | null = null;

    loader.load(model, (gltf: GLTF) => {
      if (disposed) return;

      const obj: THREE.Group = gltf.scene;
      obj.scale.set(scale, scale, scale);
      const box = new THREE.Box3().setFromObject(obj);
      obj.position.y -= box.min.y;
      scene.add(obj);

      if (gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(obj);
        const clip = gltf.animations[animationIndex] || gltf.animations[0];
        const action = mixer.clipAction(clip);
        action.reset();
        action.enabled = true;
        action.setEffectiveWeight(1);
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.play();
      }

      // Signal loaded immediately, before the render delay
      doneRef.current?.();

      timeoutId = setTimeout(() => {
        if (disposed || !containerRef.current) return;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);

        if (containerRef.current.children.length > 0)
          containerRef.current.removeChild(containerRef.current.children[0]);
        containerRef.current.appendChild(renderer.domElement);
        renderer.render(scene, cameraObj);

        const timer = new THREE.Timer();
        const animate = () => {
          animFrameId = requestAnimationFrame(animate);
          timer.update();
          if (mixer) mixer.update(timer.getDelta());
          renderer!.render(scene, cameraObj);
        };
        animate();
      }, delay);
    });

    return () => {
      disposed = true;
      clearTimeout(timeoutId);
      cancelAnimationFrame(animFrameId);
      renderer?.dispose();
      if (renderer && containerRef.current?.contains(renderer.domElement))
        containerRef.current.removeChild(renderer.domElement);
    };
  }, [
    model,
    animationIndex,
    scale,
    width,
    height,
    orthoSize,
    delay,
    cameraPosition.x,
    cameraPosition.y,
    cameraPosition.z, // Look at the numbers, not the object
    cameraTarget.x,
    cameraTarget.y,
    cameraTarget.z, // Look at the numbers, not the object
  ]);

  return <div ref={containerRef} style={{ width, height }} />;
};

export default ThreeModel;
