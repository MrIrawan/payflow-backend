/**
 * Calculate distance between two geographic points using Haversine formula
 * @param {number} lat1 - Latitude of first point (user location)
 * @param {number} lon1 - Longitude of first point (user location)
 * @param {number} lat2 - Latitude of second point (school location)
 * @param {number} lon2 - Longitude of second point (school location)
 * @returns {number} Distance in meters
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // Earth's radius in meters

  // Convert degrees to radians
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  // Haversine formula
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in meters

  return Math.round(distance); // Return rounded distance in meters
};

/**
 * Check if user is within acceptable distance from school
 * @param {number} userLat - User's latitude
 * @param {number} userLon - User's longitude
 * @param {number} schoolLat - School's latitude
 * @param {number} schoolLon - School's longitude
 * @param {number} radiusInMeters - Acceptable radius in meters (default: 500m)
 * @returns {object} Object with isValid boolean and distance in meters
 */
export const isWithinAcceptableRadius = (
  userLat,
  userLon,
  schoolLat,
  schoolLon,
  radiusInMeters = 500
) => {
  const distance = calculateDistance(userLat, userLon, schoolLat, schoolLon);

  return {
    isValid: distance <= radiusInMeters,
    distance: distance,
    radiusLimit: radiusInMeters,
  };
};
