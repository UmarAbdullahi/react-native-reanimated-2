import React, {useState} from 'react';
import Animated, {
  useSharedValue,
  useDerivedValue,
  scrollTo,
  useAnimatedRef,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withDecay,
  interpolate,
  Extrapolate,
  useAnimatedProps,
} from 'react-native-reanimated';
import MapView, {Marker} from 'react-native-maps';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Text,
  ScrollView,
} from 'react-native';
import {
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';

const TapMarker = ({i, scroll}) => {
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_) => {
      scroll.value = i * 200 + i * 20;
    },
  });

  return (
    <Marker
      coordinate={{
        latitude: 37.78825 + i * 0.0025,
        longitude: -122.4324 + i * 0.0025,
      }}>
      <TapGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={{
            width: 30,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFF',
          }}>
          <Text
            style={{
              color: 'tomato',
            }}>
            {i}
          </Text>
        </Animated.View>
      </TapGestureHandler>
    </Marker>
  );
};
export default function App() {
  const aref = useAnimatedRef();
  const scroll = useSharedValue(0);

  useDerivedValue(() => {
    scrollTo(aref, scroll.value, 0, true);
  });

  const items = Array.from(Array(10).keys());

  return (
    <View style={styles.wrap}>
      <MapView
        style={styles.wrap}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {items.map((i) => {
          return <TapMarker key={i} i={i} scroll={scroll} />;
        })}
      </MapView>
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 20,
        }}>
        <ScrollView
          ref={aref}
          horizontal
          style={{
            flex: 1,
          }}>
          {items.map((_, i) => (
            <View
              key={i}
              style={{
                width: 200,
                height: 200,
                marginRight: 20,
                backgroundColor: 'rgba(0,0,0,.2)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 30,
                }}>
                {i}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  block: {
    backgroundColor: 'tomato',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    color: '#000',
    width: '100%',
    height: 20,
  },
});
