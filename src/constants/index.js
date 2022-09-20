const suggestions = [
  {
    name: "Bird Road | Leon Medical Centers",
    address: "11501 SW 40th Street Miami, FL 33165",
  },
  {
    name: "Flagler | Leon Medical Centers",
    address: "7950 NW 2nd Street Miami, FL 33126",
  },
  {
    name: "West Hialeah | Leon Medical Centers",
    address: "2020 W 64th Street Hialeah, FL 33016",
  },
];

const constants = {
  USER: "user",
  SESSION_TOKEN: "session_token",
  IS_LOGGED_IN: "is_logged_in",
  IS_TRIP_IN_PROGRESS: "is_trip_in_progress",
  TRIP_IN_PROGRESS: "trip_in_progress",
  TRIPS: "trips",
  BOOKINGS: "bookings",
  initialRegion: {
    latitude: 19.432241,
    longitude: -99.17725,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  suggestions,
};

module.exports = constants;
