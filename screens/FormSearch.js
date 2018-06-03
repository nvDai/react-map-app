import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import Button from '../components/Button'

const FormWrapper = styled.View`
  position: absolute;
  top: 24px;
  right: 16px;
  left: 16px;
  background-color: #ffffff;
  flex-direction: column;
  border-radius: 4px;
`

const TextInput = styled.TextInput`
  height: 50px;
  padding: 8px 16px;
  font-size: 16px;
`

const Line = styled.View`
  height: 1px;
  background-color: #eeeeee;
`

export default class FormSearch extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        isLoading: PropTypes.bool,
        userAddressName: PropTypes.string
    };
    constructor(props){
        super(props);
        console.log('Hiii: '+ this.props.userAddressName);
    }

    // componentDidUpdate() {
    //     this.setState({ origin: this.props.userAddressName });
    //     console.log("Form search: " + this.props.userAddressName);
    // }
    state = {
        origin: this.props.userAddressName,//'hoc vien an ninh',
        destination: '210 tran phu, ha dong'
    };

    handleChangeInput(key, textValue) {
        this.setState({
            [key]: textValue
        })
    }

    handlePressSubmit() {
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state)
        }
    }

    render() {
        return (
            <FormWrapper>
                <TextInput
                    placeholder="Điểm đón"
                    value={this.state.origin}
                    onChangeText={this.handleChangeInput.bind(this, 'origin')}
                />
                <Line />
                <TextInput
                    placeholder="Điểm tới"
                    returnKeyType="done"
                    value={this.state.destination}
                    onChangeText={this.handleChangeInput.bind(this, 'destination')}
                />
                <Button
                    onPress={this.handlePressSubmit.bind(this)}
                    isLoading={this.props.isLoading}
                >
                    Tìm đường
                </Button>
            </FormWrapper>
        )
    }
}