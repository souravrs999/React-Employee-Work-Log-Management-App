// Built in Imports
import React from 'react';
import { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Animated } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// Custom imports
import slides from './slides';
import Paginator from './Paginator';
import NextButton from './NextButton';
import OnboardingItem from './OnboardingItem';

// Handles the Onboarding screens at the first launch of the app
export default OnBoarding = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollx = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewconfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = async () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({
                index: currentIndex + 1
            })
        } else {
            try {
                await AsyncStorage.setItem('@viewedOnboarding', 'true')
            } catch (err) {
                console.log('Error @setItem', err);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={slides}
                    renderItem={({ item }) => <OnboardingItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollx } } }], {
                        useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewconfig}
                    ref={slidesRef}
                />
            </View>
            <Paginator data={slides} scrollX={scrollx} />
            <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});