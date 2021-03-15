import React, { useRef } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default HomeScreen = () => {

    function renderHeader() {
        return (
            <View style={{ width: '100%', height: 290 }}>
                <ImageBackground source={require('../assets/images/Header-splash.png')} resizeMode='cover' style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 50, color: '#ffffff'}}> Sourav </Text>
                </ImageBackground>

            </View>
        )
    }

    const clearOnboarding = async () => {
        try {
            const result = await AsyncStorage.getItem('@viewedOnboarding');
            console.log(result);
            await AsyncStorage.removeItem('@viewedOnboarding');
        } catch (err) {
            console.log('Error @clear onboarding', err)
        }
    }

    return (
        <ScrollView>
            {renderHeader()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
}
);