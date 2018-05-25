export const geoCode = (address, callback) => {
  /*global google*/
  const geocoder = new google.maps.Geocoder();
  const geocoderStatus = google.maps.GeocoderStatus.OK;

  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (result, status) => {
      if (status !== geocoderStatus) {
        reject(status);
      }
      console.log(' ==== ', result);
      const latLng = {
        lat: result[0].geometry.location.lat(),
        lng: result[0].geometry.location.lng()
      };
      resolve(latLng);
    });
  });
};
