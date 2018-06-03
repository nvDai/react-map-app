import React from 'react'
import PropTypes from 'prop-types'
import {MapView, Permissions, Location} from 'expo';
import {getNameOfCurrentPosition} from '../api/direction';

export default class MapViewCustom extends React.Component {
    static propTypes = {
        haveDirection: PropTypes.bool,
        coords: PropTypes.array,
        getUserAddressName: PropTypes.func,
        markers: PropTypes.array,
        checkCurrentUserPosition: PropTypes.func,
        haveCurrentUserPositionStatus: PropTypes.bool
    };
    map = null;
    state = {
        mapRegion: null,

    };

    componentDidMount() {
        // yêu cầu người dùng đồng ý truy cập vị trí
        this.getLocationAsync();
        // console.log("state: " + this.state.userAddressName);

    }

    async getLocationAsync() {
        let {status} = await Permissions.askAsync(Permissions.LOCATION)
        if (status !== 'granted') {
            alert('Permission to access location was denied')
        }
        let position = await Location.getCurrentPositionAsync({})
        let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.00922 * 1.5,
            longitudeDelta: 0.00421 * 1.5
        };

        console.log(position);
        this.getCurrentPositionName(region.latitude, region.longitude);

        this.setState({mapRegion: region});
    }

    getCurrentPositionName = async (lat, lng) => {
        const geocodingRes = await getNameOfCurrentPosition(lat, lng);
        const positionName = geocodingRes.results[0].formatted_address;
        console.log("pos: " + positionName);
        this.props.getUserAddressName(positionName);
        this.props.checkCurrentUserPosition();
    };

    handleChangeMapRegion(region, lastLat, lastLong) {
        setTimeout(() => {
            this.map.animateToRegion(region);
        }, 10);
    };


    render() {
        return (
            <MapView
                ref={map => {
                    this.map = map
                }}
                style={{flex: 1}}
                region={this.state.mapRegion}
                showsUserLocation
                onRegionChange={this.handleChangeMapRegion.bind(this)}
                followsUserLocation={true}
                showsCompass={true}
                showsBuildings={true}
                showsTraffic={true}
                showsIndoors={true}
            >
                {this.props.haveDirection ? (
                    <MapView.Polyline coordinates={this.props.coords} strokeColor="#4285F4" strokeWidth={7}/>
                ) : null}
                {this.props.markers.map((marker, index) => {
                    const coords = {
                        latitude: Number(marker.latitudeDelta),
                        longitude: Number(marker.longitudeDelta)
                    };
                    console.log(coords);
                    console.log(marker.text);
                    return (
                        <MapView.Marker
                            key={index}
                            coordinate={coords}
                            title={marker.text}
                            pinColor="#44BBA4"
                        />
                    )
                })}
            </MapView>
        )
    }
}