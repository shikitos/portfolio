import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { FogExp2 } from 'three';

function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
        mesh.current.rotation.x += delta;
        mesh.current.position.z -= 0.05;

    })
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'black'} />
        </mesh>
    );
}

const Home = () => {
    const fog = new FogExp2(0x1673C3, 0.005);


    return (
        <Canvas 
            style={{ height: "100vh", width: "100vw" }}
            fog={fog}
            gl={{ antialias: true }}
            camera={{ near: 1, far: 50}}
            onCreated={({ gl }) => {
                gl.setClearColor(0x1673C3); // set the background color of the scene
                gl.gammaOutput = true; // enable gamma correction
                gl.gammaFactor = 2.2; // set the gamma factor to 2.2
            }}
        >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
        </Canvas>
    )
}

export default Home;