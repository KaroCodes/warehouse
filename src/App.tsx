
import { Canvas, useLoader } from '@react-three/fiber'
import './App.css'
import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { Mesh } from 'three'
import { useEffect, useState } from 'react'

function App() {
    const gltf = useLoader(GLTFLoader, '/warehouse/warehouse.gltf')
    const [isInit, setIsInit] = useState(false);


    useEffect(() => {
        gltf.scene.traverse(child => {
            if (child instanceof Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.geometry.computeVertexNormals();
            }
        })
        gltf.scene.castShadow = true;
        gltf.scene.receiveShadow = true;
        setIsInit(true)
    }, [gltf]);


    return (
        <Canvas camera={{ position: [0, 20, 0] }}>
            <OrbitControls
                enableZoom={true}
                maxDistance={20}
                minDistance={1}
                minPolarAngle={-Math.PI / 2}  // Limit to 45 degrees to the left
                maxPolarAngle={Math.PI / 2} />

            <ambientLight intensity={Math.PI / 4} />
            {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} /> */}
            <mesh position={[10, 10, 10]}>
                <sphereGeometry />
                <meshStandardMaterial color={'#fff5ab'} emissive={'#fff5ab'} emissiveIntensity={1} />
            </mesh>
            <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} castShadow={true} />
            {/* <directionalLight 
                position={[10, 10, 10]} 
                castShadow={true} 
                intensity={Math.PI}/> */}
            {isInit ? <primitive object={gltf.scene} /> : undefined}
            <mesh
                position={[0, -.2, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                receiveShadow>
                <planeGeometry args={[40, 40]} />
                <meshStandardMaterial color={0x666666} />
            </mesh>

        </Canvas>
    )
}

export default App
