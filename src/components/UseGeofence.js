import { useState, useEffect } from "react";
import * as Location from "expo-location";

const TARGET_LATITUDE = 6.4863;
const TARGET_LONGITUDE = 3.3653;
const RADIUS = 5; // Set radius to 5 meters

export function useGeofence() {
  const [isWithinBounds, setIsWithinBounds] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission is required to use this feature.");
        return;
      }

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 1 },
        (location) => {
          const { latitude, longitude } = location.coords;
          const distanceFromTarget = calculateDistance(
            latitude,
            longitude,
            TARGET_LATITUDE,
            TARGET_LONGITUDE
          );

          setDistance(distanceFromTarget);
          setIsWithinBounds(distanceFromTarget <= RADIUS);
        }
      );
    })();
  }, []);

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth’s radius in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  return { isWithinBounds, distance };
}
