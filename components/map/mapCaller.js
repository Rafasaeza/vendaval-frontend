'use client';

import dynamic from 'next/dynamic';

const OpenStreetMap = dynamic(() => import("@/components/map/open-street-map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});


export default function MapCaller({ coordinates, position = null}) {

    return (
      <OpenStreetMap coordinates={coordinates} newCoordinate={null} position={position}/>
    )

}

