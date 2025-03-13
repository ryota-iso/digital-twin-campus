import * as THREE from 'three'
import { Html, useGLTF } from '@react-three/drei'
import { css } from '@styled-system/css'

export function Sfc({ isDescriptions, isFilterInfo, mapDescription, location, ...props }: any) {
  const { nodes, materials } = useGLTF('/sfc.gltf') as any

  /*
   * GPSの位置情報を、3Dモデルの位置情報に変換する
   */
  type Coordinate = {
    lat: number
    lng: number
  }

  type CurrentPosition = {
    x: number
    y: number
  }

  function convertLocationToPosition(location: Coordinate): CurrentPosition {
    // 今回は使う範囲(緯度経度単位)
    const gpsWidth = 0.007671
    const gpsHeight = 0.007895

    // マップサイズ(3Dモデルのサイズ)
    const mapWidth = 70
    const mapHeight = 90

    // GPSの基準点となる左下の座標
    const gpsOrigin: Coordinate = {
      lat: 35.384441,
      lng: 139.424517,
    }

    // GPSの基準点と実際の位置情報の差分
    const offsetX = location.lng - gpsOrigin.lng
    const offsetY = location.lat - gpsOrigin.lat

    // 差分をマップの比率に変換
    const mapRatioX = (offsetX / gpsWidth) * mapWidth
    const mapRatioY = (offsetY / gpsHeight) * mapHeight

    // マップの基準点に合わせる
    const mapX = mapRatioX - mapWidth / 2
    const mapY = mapHeight / 2 - mapRatioY

    return { x: mapX, y: mapY }
  }

  const currentPosition: CurrentPosition | undefined = location ? convertLocationToPosition(location) : undefined

  return (
    <group {...props} dispose={null}>
      {/* 位置情報のマーカ */}
      {currentPosition && (
        <group position={[currentPosition.x, 3, currentPosition.y]} rotation={[0, 1.4, 0]} scale={[5, 5, 5]}>
          <Html transform occlude distanceFactor={10}>
            <svg
              stroke="#FFD500"
              fill="#FFD500"
              strokeWidth="0"
              viewBox="0 0 384 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path>
            </svg>
            <div
              className={css({
                position: 'absolute',
                top: '-64px',
                left: '0',
                width: 'max-content',
                padding: '4px',
                backgroundColor: 'gray.200',
                fontSize: '2px',
                borderRadius: '4px',
              })}>
              <p>現在地</p>
              <p>緯度: {location.lat}</p>
              <p>経度: {location.lng}</p>
            </div>
          </Html>
        </group>
      )}
      {/* SFCのモデル */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_gamma.geometry}
        material={nodes.building_gamma.material}
        position={[-14.84, 0.956, -23.336]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_beta_4.geometry}
        material={nodes.building_beta_4.material}
        position={[7.364, 0.198, -18.809]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_zeta.geometry}
        material={nodes.building_zeta.material}
        position={[1.304, 0.719, 13.829]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_guest_seminar_house.geometry}
        material={nodes.building_guest_seminar_house.material}
        position={[8.323, 0.526, 2.301]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_kanai_house.geometry}
        material={nodes.building_kanai_house.material}
        position={[3.305, 0.431, 10.691]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_mori_atelier.geometry}
        material={nodes.building_mori_atelier.material}
        position={[5.082, 0.452, 6.574]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_dnp_house.geometry}
        material={nodes.building_dnp_house.material}
        position={[2.089, 0.353, 5.438]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_ntt_house.geometry}
        material={nodes.building_ntt_house.material}
        position={[0.671, 0.344, 7.114]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_iij_house.geometry}
        material={nodes.building_iij_house.material}
        position={[0.913, 0.332, 9.364]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_bus_station.geometry}
        material={nodes.building_bus_station.material}
        position={[23.812, 0.241, -16.071]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_beta_3.geometry}
        material={nodes.building_beta_3.material}
        position={[9.053, 0.379, -19.953]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_beta_pavilion.geometry}
        material={nodes.building_beta_pavilion.material}
        position={[6.53, 0.55, -21.921]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_beta_1.geometry}
        material={nodes.building_beta_1.material}
        position={[2.989, 0.419, -22.572]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_beta_studio.geometry}
        material={nodes.building_beta_studio.material}
        position={[0.64, 0.179, -22.063]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_high_school_ground_warehouse.geometry}
        material={nodes.building_high_school_ground_warehouse.material}
        position={[-11.05, 0.359, 14.029]}
        rotation={[0, 0.032, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_archery_field.geometry}
        material={nodes.building_archery_field.material}
        position={[-6.021, 0.39, 16.426]}
        rotation={[0, 0.027, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_high_school.geometry}
        material={nodes.building_high_school.material}
        position={[-25.62, 1.073, 15.555]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_beta_2.geometry}
        material={nodes.building_beta_2.material}
        position={[3.266, 0.369, -18.875]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_beta_dome.geometry}
        material={nodes.building_beta_dome.material}
        position={[3.244, 0.382, -21.4]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_lounge.geometry}
        material={nodes.building_lounge.material}
        position={[-10.855, 0.441, 3.687]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_omega.geometry}
        material={nodes.building_omega.material}
        position={[-7.792, 0.908, -0.255]}
        rotation={[0, 0.032, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_alpha.geometry}
        material={nodes.building_alpha.material}
        position={[-6.473, 1.145, -6.629]}
        rotation={[0, 0.032, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_mu.geometry}
        material={nodes.building_mu.material}
        position={[-11.66, 1.073, -4.634]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_high_school_ground_washroom.geometry}
        material={nodes.building_high_school_ground_washroom.material}
        position={[-14.854, 0.25, 14.906]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_sigma.geometry}
        material={nodes.building_sigma.material}
        position={[-21.412, 0.642, 5.44]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_delta.geometry}
        material={nodes.building_delta.material}
        position={[-26.798, 0.581, -3.986]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_kappa_1.geometry}
        material={nodes.building_kappa_1.material}
        position={[-18.236, 0.572, 1.287]}
        rotation={[0, 0.037, 0]}
        scale={0.091}>
        {isFilterInfo && (
          <>
            <meshStandardMaterial color={'#1C51FC'} />
            <Html distanceFactor={10}>
              <div className="content">
                course:{mapDescription[0].name} <br />
                teacher:{mapDescription[0].teachers[0].name}
                <br />
                time:{mapDescription[0].dayOfWeeks} period-{mapDescription[0].periods.period}
                <br />
              </div>
            </Html>
          </>
        )}
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_kappa_2.geometry}
        material={nodes.building_kappa_2.material}
        position={[-21.446, 1.527, -0.277]}
        rotation={[0, 0.037, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_epsilon_2.geometry}
        material={nodes.building_epsilon_2.material}
        position={[-20.655, 1.478, -1.166]}
        rotation={[0, 0.037, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_epsilon_1.geometry}
        material={nodes.building_epsilon_1.material}
        position={[-17.68, 0.411, -0.452]}
        rotation={[0, 0.037, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_iota_1.geometry}
        material={nodes.building_iota_1.material}
        position={[-16.929, 0.559, -5.049]}
        rotation={[0, 0.037, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_iota_2.geometry}
        material={nodes.building_iota_2.material}
        position={[-20.035, 1.421, -9.41]}
        rotation={[0, 0.037, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_omicron_1.geometry}
        material={nodes.building_omicron_1.material}
        position={[-16.319, 0.562, -8.15]}
        rotation={[0, 0.037, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_omicron_2.geometry}
        material={nodes.building_omicron_2.material}
        position={[-19.361, 1.145, -9.291]}
        rotation={[0, 0.037, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_theta.geometry}
        material={nodes.building_theta.material}
        position={[-9.596, 1.064, -11.281]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_lambda_1.geometry}
        material={nodes.building_lambda_1.material}
        position={[-14.002, 0.58, -11.893]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_lambda_2.geometry}
        material={nodes.building_lambda_2.material}
        position={[-17.11, 1.442, -11.327]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_tau.geometry}
        material={nodes.building_tau.material}
        position={[-25.055, 1.083, -11.345]}
        rotation={[0, 0.021, 0]}
        scale={0.091}
      />
      <group position={[-26.508, 0, -28.492]} rotation={[0, Math.PI / 2, 0]} scale={[1, 0.036, 1]}>
        <mesh castShadow receiveShadow geometry={nodes.Plane001.geometry} material={materials.other} />
        <mesh castShadow receiveShadow geometry={nodes.Plane001_1.geometry} material={materials.ground2} />
        <mesh castShadow receiveShadow geometry={nodes.Plane001_2.geometry} material={materials.ground} />
        <mesh castShadow receiveShadow geometry={nodes.Plane001_3.geometry} material={materials.lake} />
        <mesh castShadow receiveShadow geometry={nodes.Plane001_4.geometry} material={materials.ground3} />
      </group>
      <group position={[-19.866, 0, 2.693]} rotation={[-Math.PI, 1.555, -Math.PI]}>
        <mesh castShadow receiveShadow geometry={nodes.Plane005.geometry} material={materials.Material} />
        <mesh castShadow receiveShadow geometry={nodes.Plane005_1.geometry} material={materials.k_m}>
          {isDescriptions && <meshStandardMaterial color={'#1C51FC'} />}
        </mesh>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.load_outer.geometry}
        material={nodes.load_outer.material}
        position={[-16.676, -0.031, 31.55]}
        rotation={[-Math.PI, 1.555, -Math.PI]}
        scale={[1, 4.003, 1]}
      />
    </group>
  )
}

useGLTF.preload('/sfc.gltf')
