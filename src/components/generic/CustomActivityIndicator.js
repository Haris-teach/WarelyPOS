import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const CustomActivityIndicator = () => {
    return (
        <View style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'absolute',
        }}>
            <ActivityIndicator
                animating={true}
                size="large"
                color="#0000ff" />
        </View>
    );
}

export default CustomActivityIndicator;