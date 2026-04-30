import React, { useState } from 'react';
import { mockPollingBooths } from '../../data/mockData';
import { MapPin, Info } from 'lucide-react';

import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { getEnvVar } from '../../utils/env';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 28.6139,
  lng: 77.2090
};

const MapComponent: React.FC = () => {
  const [selectedBooth, setSelectedBooth] = useState<number | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: getEnvVar('VITE_GOOGLE_MAPS_API_KEY') || ''
  });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
      <div className="flex items-center space-x-2 mb-6 text-indigo-600 dark:text-indigo-400">
        <MapPin className="w-6 h-6" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Nearby Polling Booths</h2>
      </div>

      <div className="relative w-full h-[300px] md:h-[400px] bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden mb-6 border border-gray-200 dark:border-slate-700">
        {!getEnvVar('VITE_GOOGLE_MAPS_API_KEY') ? (
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-gray-500 z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
             <p>Please provide a VITE_GOOGLE_MAPS_API_KEY in .env.local to view the map.</p>
          </div>

        ) : loadError ? (
          <div className="absolute inset-0 flex items-center justify-center text-red-500">
            Error loading Google Maps
          </div>
        ) : isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
            }}
          >
            {mockPollingBooths.map((booth) => (
              <MarkerF
                key={booth.id}
                position={{ lat: booth.lat!, lng: booth.lng! }}
                onClick={() => setSelectedBooth(booth.id)}
              >
                {selectedBooth === booth.id && (
                  <InfoWindowF
                    onCloseClick={() => setSelectedBooth(null)}
                  >
                    <div className="text-gray-800 p-1">
                      <h4 className="font-bold">{booth.name}</h4>
                      <p className="text-sm">Distance: {booth.distance}</p>
                      <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-md ${booth.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {booth.status}
                      </span>
                    </div>
                  </InfoWindowF>
                )}
              </MarkerF>
            ))}
          </GoogleMap>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
          </div>
        )}
      </div>

      <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-xl">
        <Info className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
        <p className="text-sm leading-relaxed">
          The map now integrates with the Google Maps API. Select a marker to view details about the polling booth.
        </p>
      </div>
    </div>
  );
};

export default MapComponent;

