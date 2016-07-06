The panoramaState contains among other things these variables:
{
  location: {
    latitude: 52.123,
    longitude: 4.789
  },
  carOrientation: {
    heading: 0.5,
    pitch: 0
  },
  cameraOrientation: {
    heading: 1,
    pitch: 0
  }
}

- The carOrientation is provided by the Earthmine service, this will never change for a specific Panorama ID.
- The cameraOrientation is by default equal to the carOrientation, but this can be influenced through user interaction.
- Heading is relative to north.
- The Marzipano service sometimes uses yaw (internally), which is relative to the heading.
- Earthmine is a liar! It communicates yaw variables but they are actually the heading values.

Degrees vs Radians
- Earthmine uses degrees for heading and pitch.
- Marzipano uses radians for yaw and pitch.
- atlasApp.straatbeeld uses degrees in the URL and interface for yaw and pitch, but it stores the panoramaState in 
  radians.
