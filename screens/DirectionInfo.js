import React from 'react';
import {Text} from 'react-native';
import styled from "styled-components/native";
import PropTypes from 'prop-types'
import Button from '../components/Button'


const DirectionInfoBox = styled.View `
    position: absolute;
    bottom: 50px;
    right: 16px;
    left: 16px;
    border: 1px solid #ffffff;
    background-color: #ffffff;
    padding: 5px 7px;
    border-radius: 4px;
`;

const FlexWrapper = styled.View `
    flex-direction: row;
    justify-content: space-between;
    padding: 16px;
`;

// const TextBlue = Text.extends `
//     color: "#3F88C5";
// `;

const InfoText = styled.Text `
    font-size: 20;
    font-weight: 600;
`;

export default class DirectionInfo extends React.Component {
    static propTypes = {
        distance: PropTypes.string,
        duration: PropTypes.string
    };
    render() {
        return (
            <DirectionInfoBox>
                <InfoText>Halu</InfoText>
                <FlexWrapper>
                    <InfoText>Distance: {this.props.distance}</InfoText>
                    <InfoText>Duration: {this.props.duration}</InfoText>
                    <InfoText>Cost: 20k</InfoText>
                </FlexWrapper>
                <Button
                >
                    DONE
                </Button>
            </DirectionInfoBox>
        )
    }
}
