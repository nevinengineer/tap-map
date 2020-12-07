import {useState, useEffect} from 'react';

const defaultSettings = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0,
};

export const usePosition = (watch = false, settings = defaultSettings) => {
  const default_position = {latitude: 39.0, longitude:-77.0}
  const [position, setPosition] = useState(default_position);
  const [error, setError] = useState(null);

  const onChange = ({coords, timestamp}) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      timestamp,
    });
  };

  const onError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }

    let watcher = null;
    if (watch) {
      watcher = geo.watchPosition(onChange, onError, settings);
    } else {
      geo.getCurrentPosition(onChange, onError, settings);
    }

    return () => watcher && geo.clearWatch(watcher);
  }, [settings]);

  return {...position, error};
};