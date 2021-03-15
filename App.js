import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


import OnBoarding from './components/screens/OnBoarding';
import LandingPage from './components/LandingPage';

const Loading = () => {
  return (
    <View>
      <ActivityIndicator size="large" color="#f4323f" animating={true} />
    </View>
  );
};

export default App = () => {

  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewOnboarding] = useState(false);

  // Check if the user has viewed onboarding previously
  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnboarding');
      console.log(value);
      if (value !== null) {
        setViewOnboarding(true)
      }

    } catch (err) {
      console.log('Error @checkonboarding:', err)

    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <Loading /> : viewedOnboarding ? <LandingPage /> : <OnBoarding />}
      <StatusBar syle="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
