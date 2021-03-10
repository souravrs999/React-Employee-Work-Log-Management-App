// Built in Imports
import React from 'react';
import { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';

// Custom imports
import slides from '../components/slides';
import Paginator from '../components/Paginator';
import OnboardingItem from '../components/OnboardingItem';

// Handles the Onboarding screens at the first launch of the app
export default OnBoarding = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollx = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewconfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={slides}
                    renderItem={({ item }) => <OnboardingItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator
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

            <Paginator data={slides} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});