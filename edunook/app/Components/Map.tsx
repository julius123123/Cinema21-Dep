"use client"
import {GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

interface MapProps {
    lat: number;
    lng: number;
}

const Map: React.FC<MapProps> = ({ lat, lng }) => {
    const {isLoaded} = useLoadScript ({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string
    });

    if(!isLoaded) return <div 
                            className="text-black"
                            >Loading...
                        </div>
    
    return(
        <GoogleMap
        zoom={15}
        center={{lat, lng}}
        mapContainerStyle={{width: '100%', height: '400px'}}
        >
            <Marker position ={{lat, lng}} />
        </GoogleMap>
    );
};

export default Map;