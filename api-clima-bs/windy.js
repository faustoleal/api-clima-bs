const options = {
  key: `BoKPBbwp6kzSTmTBQRDYAK0CoP1wdiMB`,
  verbose: false,
  lat: -34.2,
  lon: -58.9,
  zoom: 10,
};

windyInit(options, (windyAPI) => {
  const { map } = windyAPI;

  L.popup().setLatLng([-34.2, -58.9]);
  console.log(windyAPI);
});
