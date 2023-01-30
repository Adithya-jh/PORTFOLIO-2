import {
  PresentationControls,
  Float,
  Environment,
  useGLTF,
  OrbitControls,
  ContactShadows,
  Html,
  Text,
  //   rectAreaLight,
} from "@react-three/drei";
// import { RectAreaLight } from "three";

export default function Experience() {
  const laptop = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );

  return (
    <>
      <Environment preset="city" />
      <color args={["skyblue"]} attach="background" />

      {/* <OrbitControls makeDefault /> */}

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
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

          <primitive object={laptop.scene} position-y={-1.2}>
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
