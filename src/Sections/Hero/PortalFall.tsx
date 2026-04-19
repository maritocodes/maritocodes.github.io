import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { useLoading } from "../../LoadingContext";

interface FallingModel {
  model: string;
  animationIndex?: number;
  scale?: number;
  /** 1 (lightest) – 10 (heaviest). Scales the global fallSpeed for this object. Default 5. */
  weight?: number;
}

interface Props {
  models: FallingModel[];
  cameraPosition?: { x: number; y: number; z: number };
  orthoSize?: number;
  fallSpeed?: number;
  spacing?: number;
  onAllLoaded?: () => void;
}

const PortalFall = ({
  models,
  cameraPosition = { x: 0, y: 0, z: 5 },
  orthoSize = 3,
  fallSpeed = 1.5,
  spacing = 6,
  onAllLoaded,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<(() => void) | null>(null);
  const { register } = useLoading();

  if (doneRef.current === null) {
    doneRef.current = register("PortalFall"); // register() returns the done() function, store it
  }

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();

    const aspect = width / height;
    const cam = new THREE.OrthographicCamera(
      -orthoSize * aspect,
      orthoSize * aspect,
      orthoSize,
      -orthoSize,
      0.1,
      100,
    );
    cam.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    cam.lookAt(0, 0, 0);
    scene.add(cam);

    scene.add(new THREE.DirectionalLight(0xffffff, 1));
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (containerRef.current.children.length > 0)
      containerRef.current.removeChild(containerRef.current.children[0]);
    containerRef.current.appendChild(renderer.domElement);

    const topY = orthoSize;
    const bottomY = -orthoSize;
    const xRange = orthoSize * aspect * 0.9;

    // Distribute x positions evenly across the range so they never collapse.
    // We divide the range into N equal slots and place each model in the
    // centre of its slot, then add a small random jitter within the slot.
    const computeXPositions = (count: number): number[] => {
      const slotWidth = (xRange * 2) / count;
      return Array.from({ length: count }, (_, i) => {
        const slotCenter = -xRange + slotWidth * i + slotWidth / 2;
        const jitter = 0;
        return slotCenter + jitter;
      });
    };

    const xPositions = computeXPositions(models.length);

    // Per-object metadata (set once the GLTF is loaded)
    type ObjMeta = {
      obj: THREE.Group;
      halfHeight: number;
      laneIndex: number;
      speedMultiplier: number; // derived from weight
    };

    const loader = new GLTFLoader();

    const draco = new DRACOLoader();
    draco.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.6/",
    );
    loader.setDRACOLoader(draco);

    const mixers: THREE.AnimationMixer[] = [];
    const metas: ObjMeta[] = [];
    let loadedCount = 0;
    let animFrameId: number;
    const timer = new THREE.Timer();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      timer.update();
      const delta = timer.getDelta();

      mixers.forEach((mx) => mx.update(delta));

      metas.forEach((meta) => {
        meta.obj.position.y -= fallSpeed * meta.speedMultiplier * delta;

        // An object has fully exited the bottom when its TOP edge goes below
        // the bottom portal, i.e. position.y + halfHeight < bottomY.
        // Respawn it so its BOTTOM edge appears just above the top portal.
        if (meta.obj.position.y + meta.halfHeight < bottomY) {
          meta.obj.position.y = topY + meta.halfHeight;
          // Re-randomise x within the same lane slot so there's a little
          // variation without ever causing a collision with another lane.
          const slotWidth = (xRange * 2) / models.length;
          const slotCenter =
            -xRange + slotWidth * meta.laneIndex + slotWidth / 2;
          const jitter = (Math.random() - 0.5) * slotWidth * 0.5;
          meta.obj.position.x = slotCenter + jitter;
        }
      });

      renderer.render(scene, cam);
    };

    models.forEach((m, i) => {
      setTimeout(() => {
        loader.load(m.model, (gltf: GLTF) => {
          const obj = gltf.scene as THREE.Group;

          const s = m.scale ?? 1;
          obj.scale.set(s, s, s);

          // Measure the object BEFORE positioning so the box is in local space.
          const box = new THREE.Box3().setFromObject(obj);
          const modelHeight = box.max.y - box.min.y;
          const halfHeight = modelHeight / 2;

          // Ground the feet: shift so the bottom of the mesh sits at y=0 of the group.
          obj.position.y -= box.min.y;

          // X: fixed lane
          obj.position.x = xPositions[i];

          // Y: stagger each model by `spacing` units so they don't all arrive at
          // the bottom at the same time. topY + halfHeight puts the bottom edge
          // exactly at the top portal; add i*spacing to offset further upward.
          obj.position.y += topY + halfHeight + i * spacing;

          scene.add(obj);
          // Map weight 1–10 to a multiplier range of 0.5×–2×.
          // weight 5 (default) → 1.0× (neutral), 1 → 0.5×, 10 → 2×.
          const weight = Math.min(10, Math.max(1, m.weight ?? 5));
          const speedMultiplier = 0.5 + ((weight - 1) / 9) * 0.5;

          metas.push({ obj, halfHeight, laneIndex: i, speedMultiplier });

          if (gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(obj);
            const clip =
              gltf.animations[m.animationIndex ?? 0] ?? gltf.animations[0];
            const action = mixer.clipAction(clip);
            action.reset();
            action.enabled = true;
            action.setEffectiveWeight(1);
            action.setLoop(THREE.LoopRepeat, Infinity);
            action.play();
            mixers.push(mixer);
          }

          loadedCount++;
          if (loadedCount === models.length) {
            doneRef.current?.();
            onAllLoaded?.();
            animate();
          }
        });
      }, i * 500); // stagger by 200ms each
    });

    return () => {
      cancelAnimationFrame(animFrameId);
      renderer.dispose();
      if (containerRef.current?.contains(renderer.domElement))
        containerRef.current.removeChild(renderer.domElement);
    };
  }, [models, orthoSize, fallSpeed, spacing, cameraPosition]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default PortalFall;
