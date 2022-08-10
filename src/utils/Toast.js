import React from 'react';
import { View, StyleSheet, ToastAndroid, Button, StatusBar } from 'react-native';

export const showToastWithGravityAndOffset = (msg) => {
 
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };