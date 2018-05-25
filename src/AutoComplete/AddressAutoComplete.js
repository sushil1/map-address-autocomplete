import React, { Component } from 'react';
import debounce from 'lodash';

import { geoCode } from './geocoder';

/*global google*/

class AddressAutoComplete extends Component {
  state = {
    address: '',
    autocompleteResults: null
  };

  componentDidMount() {
    if (!window.google) {
      throw new Error('Google API library must be loaded');
    }

    if (!window.google.maps.places) {
      throw new Error(
        'Google Maps Places library must be loaded, add libraries=places to the google map api url'
      );
    }
    console.log(google.maps.places);

    //initialize autocomplete service and check the status of autocomplete

    this.autocompleteService = new google.maps.places.AutocompleteService();
    this.autocompleteStatus = google.maps.places.PlacesServiceStatus.OK;

    this.options = {
      location: new google.maps.LatLng({ lat: -34, lng: 151 }),
      radius: 50000,
      types: ['address']
    };
  }

  // fetch suggestions if the length of input is greater than 3
  //and call the callback displaySuggestions

  fetchSuggestions() {
    if (this.state.address.length === 0) {
      return this.clearSuggestions();
    }
    if (this.state.address.length < 4) {
      return;
    } else {
      this.autocompleteService.getPlacePredictions(
        {
          input: this.state.address,
          country: 'au',
          ...this.options
        },
        (arr, status) => {
          if (status !== this.autocompleteStatus) {
            this.setState({
              error: 'Error occured'
            });
            return this.clearSuggestions();
          }
          console.log('array ==== ', arr, 'status ==== ', status);
          this.setState({
            autocompleteResults: arr
          });
        }
      );
    }
  }

  //debounce fetch suggestions

  debounceFetchSuggestions = () => debounce(this.fetchSuggestions(), 2000);

  //clearSuggestions

  clearSuggestions = () =>
    this.setState({
      autocompleteResults: null
    });

  onChange = address => {
    this.setState({
      address: address
    });
    this.debounceFetchSuggestions();
  };

  onSelect = address =>
    this.setState({
      address
    });

  handleSubmit = address => {
    //geocode and send it to parent component
    return geoCode(address).then(latLng => this.props.changeLocation(latLng));
  };

  //handle address select from the suggestions

  handleAddressSelect = address => {
    this.onSelect(address);
    this.clearSuggestions();
    this.handleSubmit(address);
  };

  render() {
    const { address, autocompleteResults } = this.state;
    console.log('state === ', this.state);
    console.log(address);
    return (
      <div
        style={{
          flex: '1',
          marginTop: '40px',
          marginLeft: '25%',
          width: '50%'
        }}
      >
        <input
          style={{
            width: '100%',
            height: '30px',
            border: '1 px solid teal',
            borderRadius: '5px',
            fontSize: '16px'
          }}
          placeholder=" Search and go ..."
          value={address}
          id="addressInput"
          onChange={e => this.onChange(e.target.value)}
        />
        <div
          style={{
            marginTop: '0',
            position: 'absolute',
            margin: '0',
            backgroundColor: 'yellow',
            opacity: '0.6',
            width: '296px'
          }}
        >
          {autocompleteResults != null &&
            autocompleteResults.length > 0 &&
            autocompleteResults.map((item, i) => (
              <p
                style={{
                  border: '1px solid teal',
                  padding: '8px',
                  margin: '5px',
                  cursor: 'pointer'
                }}
                key={item.id}
                onClick={() => this.handleAddressSelect(item.description)}
              >
                {item.description}
              </p>
            ))}
        </div>
      </div>
    );
  }
}

export default AddressAutoComplete;
