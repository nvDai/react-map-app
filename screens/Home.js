import React from 'react'
import styled from 'styled-components/native'
import MapView from './MapView'
import FormSearch from './FormSearch'
import {getDirectionData, decodePopyline} from '../api/direction'
import DirectionInfo from './DirectionInfo'

const HomeWrapper = styled.View`
  flex: 1;
  position: relative;
`

export default class HomeScreen extends React.Component {
    state = {
        userAddressName: '',
        isLoading: false,
        direction: {
            coords: [],
            origin: {
                text: '',
                latitudeDelta: '',
                longitudeDelta: ''
            },
            destination: {
                text: '',
                latitudeDelta: '',
                longitudeDelta: ''
            },
            distance: 0,
            duration: 0
        },
        haveDirection: false,
        haveCurrentUserPosition: false,
        searchData: {
            origin: '',
            destination: ''
        }
    }

    async handleChangeSearch(searchData) {
        this.setState({searchData, isLoading: true})
        const resJson = await getDirectionData({
            origin: searchData.origin,
            destination: searchData.destination
        });
        console.log(resJson);

        console.log(resJson);
        if (resJson.routes.length > 0) {
            let routeFirst = resJson.routes[0];
            let leg = routeFirst.legs[0];
            // thông tin về khoảng cách, thời gian

            let direction = {
                coords: decodePopyline(routeFirst.overview_polyline.points),
                // trích xuất các diểm từ google maps, thực hiện việc vẽ polylines
                origin: {
                    text: leg.start_address,
                    latitudeDelta: leg.start_location.lat,
                    longitudeDelta: leg.start_location.lng
                },
                destination: {
                    text: leg.end_address,
                    latitudeDelta: leg.end_location.lat,
                    longitudeDelta: leg.end_location.lng
                },
                distance: leg.distance,
                duration: leg.duration
            }
            this.setState({direction, isLoading: false, haveDirection: true})
        } else {
            alert('Địa điểm không được tìm thấy vui lòng thử lại')
            this.setState({
                isLoading: false,
                haveDirection: false
            })
        }
    };

    getUserAddressName = async (userAddressName) => {
        await this.setState({userAddressName});
        console.log("Home: " + this.state.userAddressName);
    };

    checkCurrentUserPosition = () => {
        this.setState({haveCurrentUserPosition: true})
    };

    render() {
        return (
            <HomeWrapper>
                {/* Truyen các điểm được trích xuất từ google api */}
                <MapView
                    haveDirection={this.state.haveDirection}
                    coords={this.state.direction.coords}
                    getUserAddressName={this.getUserAddressName.bind(this)}
                    markers={[this.state.direction.origin, this.state.direction.destination]}
                    checkCurrentUserPosition={this.checkCurrentUserPosition}
                    haveCurrentUserPositionStatus={this.state.haveCurrentUserPosition}
                />
                {this.state.haveCurrentUserPosition ?
                    (<FormSearch
                        isLoading={this.state.isLoading}
                        onSubmit={this.handleChangeSearch.bind(this)}
                        userAddressName={this.state.userAddressName}
                    />) : null
                }

                {
                    (this.state.haveDirection && this.state.haveCurrentUserPosition)  ?
                    <DirectionInfo
                        distance={this.state.direction.distance.text}
                        duration={this.state.direction.duration.text}
                    />
                    :
                    null
                }

            </HomeWrapper>
        )
    }
}