import { View, Text ,StyleSheet,Image,StatusBar} from 'react-native'
import React, {useEffect } from 'react';
import AppStatusBar from '../components/AppStatusBar';
import {getUserDetails} from '../utils/LocalStorage';


export default function SplashScreen({navigation}) {  
  useEffect(() => {
    checkLoginOrNot();
   },[0]);
  
   const performTimeConsumingTask =() => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 3000),
    );
  };

  const  checkLoginOrNot = async () =>{
    const data = await performTimeConsumingTask();   
    const user = await getUserDetails(); 
    if (data !== null) {
      if (user !== null) {
        navigation.replace('HomeScreen');
      } else {
          navigation.replace('WelcomeScreen');

      }
    }
  }


    return (
      <View style={styles.container}>

     
      <StatusBar
      backgroundColor="white"
      barStyle="dark-content"
    />
      <Image
        style={styles.logo}
        source={require('../assets/images/original-logo.png')}
      />
      <View style={styles.bottomImage}>
        <Image source={require('../assets/images/thumb1.png')}/>
      </View>
    </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  
  },
  logo: {
    height: 250,
    width: 250,
    resizeMode: 'contain',
  },

  bottomImage: {
    height: 150,
    width: 200,
    position: 'absolute',
    bottom: 15,
    right: 80,
  },
});