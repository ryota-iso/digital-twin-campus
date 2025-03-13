import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { BakeShadows, OrbitControls, MapControls, Stage } from '@react-three/drei'
import Chat from './chat'
import { Sfc } from './sfc'

export default function DigitalCampus() {
  const [isDescriptions, setIsDescriptions] = useState(false)
  const [isFilterInfo, setIsFilterInfo] = useState(false)
  const [mapDescription, setMapDescription] = useState()

  type Coordinate = {
    lat: number
    lng: number
  }

  // 位置情報
  const [location, setLocation] = useState<Coordinate | undefined>()

  useEffect(() => {
    // 位置情報を取得
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinate: Coordinate = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setLocation(coordinate)
      },
      (error) => {
        console.log(error)
      },
    )
  }, [])

  return (
    <>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 180, 150], fov: 40 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Sfc
              isDescriptions={isDescriptions}
              isFilterInfo={isFilterInfo}
              mapDescription={mapDescription}
              location={location}
              rotation={[0, -(Math.PI / 2), 0]}>
              {/* <mesh castShadow position={[35, 0, -45]} rotation={[0, 0, 0]} /> */}
            </Sfc>
          </Stage>
          <BakeShadows />
        </Suspense>
        <MapControls maxPolarAngle={Math.PI / 2} />
      </Canvas>
      <Chat setIsDescriptions={setIsDescriptions} setIsFilterInfo={setIsFilterInfo} setMapDescription={setMapDescription} />
    </>
  )
}
