import React from "react";
import RNPickerSelect from 'react-native-picker-select'

export const Picker = (props) => {

    const placeholder = {
        label: 'Selecione uma moeda...',
        value: null,
        color: '#000'
    }

    return (
        <RNPickerSelect
            placeholder={placeholder}
            items={props.moedas}
            onValueChange={(value) => props.onChange(value)}
            style={{
                inputIOS: {
                    fontSize: 20,
                    color: '#000',
                },
                inputAndroid: {
                    fontSize: 20,
                    color: '#000'
                }
            }}
        />
    )
}