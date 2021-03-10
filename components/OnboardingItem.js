import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';


export default OnboardingItem = ({ item }) => {
    const { width } = useWindowDimensions();


    return (
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]} />

            <View style={{ flex: 0.3 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1f1f1f'
    },

    image: {
        flex: 0.7,
        maxWidth: 400,
        justifyContent: 'center',
    },

    title: {
        fontWeight: '900',
        fontSize: 28,
        marginBottom: 10,
        color: '#ffa500',
        textAlign: 'center'
    },

    description: {
        fontWeight: '300',
        color: '#7a7a7a',
        textAlign: 'center',
        paddingHorizontal: 64,
    }
});