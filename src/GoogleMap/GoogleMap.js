import React, { Component } from 'react';

const google = window.google;

class GoogleMap extends Component {
  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: this.props.lat, lng: this.props.lng },
      zoom: 14
    });
  }

  componentWillReceiveProps(nextProps) {
    this.map.panTo({
      lat: nextProps.lat,
      lng: nextProps.lng
    });
  }

  render() {
    return <div id="map" ref="map" />;
  }
}

export default GoogleMap;
