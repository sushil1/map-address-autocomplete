import React, { Component } from 'react';
import GoogleMap from './GoogleMap/GoogleMap';
import AddressAutoComplete from './AutoComplete';

class App extends Component {
  state = {
    lat: -34.397,
    lng: 150.644
  };

  handleLocationChanged = ({ lat, lng }) =>
    this.setState({
      lat,
      lng
    });

  render() {
    return (
      <div>

        <div
          style={{
            boxSizing: 'border-box',
            margin: 'auto',
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            height: '600px',
            width: '600px',
            borderRadius: '3px',
            boxShadow: '1px 1px 2px gray'
          }}
        >
          <div
            style={{
              flex: '0.2',
              alignSelf: 'stretch',
              border: '2px solid pink',
              margin: '10px 10px 0px 10px ',
              zIndex: '1',
              background: 'pink'
            }}
          >
            <AddressAutoComplete changeLocation={this.handleLocationChanged} />
          </div>

          <div
            style={{
              backgroundColor: 'red',
              width: '580px',
              flex: '0.8',
              alignSelf: 'stretch',
              margin: '0px 10px 10px 10px '
            }}
          >
            <GoogleMap lat={this.state.lat} lng={this.state.lng} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
