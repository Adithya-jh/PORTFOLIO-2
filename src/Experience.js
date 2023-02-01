import {
  PresentationControls,
  Float,
  Environment,
  useGLTF,
  OrbitControls,
  ContactShadows,
  Html,
  Text,
  useAnimations,
  //   rectAreaLight,
} from "@react-three/drei";
// import { RectAreaLight } from "three";

import { Debug, RigidBody, Physics } from "@react-three/rapier";
import { useEffect, useState } from "react";
import { useRef } from "react";

export default function Experience() {
  const laptop = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );
  const tree = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-beech/model.gltf"
  );
  const cromLech = useGLTF(
    // "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/cromlech/model.gltf"
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/cromlech/model.gltf"
  );
  const Korrigan = useGLTF(
    // "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/cromlech/model.gltf"
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/druid/model.gltf"
  );

  const KorriganOnWall = useGLTF(
    // "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/cromlech/model.gltf"
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/young-korrigan/model.gltf"
  );

  const LightPost = useGLTF(
    // "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/cromlech/model.gltf"
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/lamp-post/model.gltf",
    { Waiting: true }
  );

  const lapRef = useRef();

  const lapRot = () => {
    lapRef.current.applyTorqueImpulse({ x: 0, y: 1, z: 0 });
  };

  const KorriganAnimation = useAnimations(Korrigan.animations, Korrigan.scene);
  const KorriganonWallAnimation = useAnimations(
    KorriganOnWall.animations,
    KorriganOnWall.scene
  );

  useEffect(() => {
    const action1 = KorriganAnimation.actions.Waiting;
    const action2 = KorriganonWallAnimation.actions.pose_jeune;
    action1.play();
    action2.play();
  });

  const [rot, setRot] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const newRot = window.innerWidth < 600 ? -0.8 : null;
      setRot(newRot);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [scale, setScale] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const newScale = window.innerWidth < 600 ? 2 : null;
      setScale(newScale);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Environment preset="city" />
      {/* <color args={["skyblue"]} attach="background" /> */}

      {window.innerWidth < 600 && <OrbitControls makeDefault />}

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        // rotation={[0.13, 0.1, 0]}
        polar={[0, 0]}
        // polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tensions: 400 }}
        snap={{ mass: 2, tensions: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"red"}
            rotation={[-0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />

          <Physics>
            <RigidBody type="fixed" ref={lapRef} colliders="hull">
              <primitive
                wrapperClass="mobileSize"
                object={laptop.scene}
                // position-z={-1.2}
                position-y={-1.2}
                rotation-y={rot}
                // scale={[scale, scale, scale]}
                // onClick={lapRot}
              >
                <Html
                  transform
                  wrapperClass="htmlScreen"
                  distanceFactor={1.17}
                  position={[0, 1.56, -1.4]}
                  rotation-x={-0.256}
                >
                  <iframe src="https://jayahari-adi.vercel.app/" />
                </Html>
              </primitive>
            </RigidBody>
          </Physics>

          <primitive
            object={tree.scene}
            scale={[0.1, 0.1, 0.1]}
            position-x={-3.0}
            position-y={-1.0}
          ></primitive>

          <primitive
            object={cromLech.scene}
            scale={[0.1, 0.1, 0.1]}
            position-x={0.0}
            position-y={-1.0}
          ></primitive>

          {/* <primitive
            object={LightPost.scene}
            scale={[1, 1, 1]}
            position-x={0.0}
            position-y={0.0}
            // {"pose_vieux":true}
          ></primitive> */}

          <primitive
            object={Korrigan.scene}
            scale={[1, 1, 1]}
            position-x={1.0}
            position-y={-0.7}
            position-z={0.6}
            // {"pose_vieux":true}
            // {"Waiting":true}
          ></primitive>

          <primitive
            object={KorriganOnWall.scene}
            scale={[1.5, 1.5, 1.5]}
            position-x={-2.5}
            position-y={-0.2}
            position-z={0.2}
            // {"pose_vieux":true}
            // {"Waiting":true}
          ></primitive>

          <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={0.75}
            position={[2, 1, 0.75]}
            rotation-y={[-1.25]}
            children={" It'z me\rJHA"}
            maxWidth={2}
            textAlign={"center"}
          >
            It'z me JHA
          </Text>
        </Float>
      </PresentationControls>

      <ContactShadows position-y={-1.4} blur={2.4} />
    </>
  );
}
