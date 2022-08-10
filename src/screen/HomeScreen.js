import { View, Text, StyleSheet, Image, Button, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getUserDetails } from '../utils/LocalStorage';
import Loading from '../components/Loading';
import AppStatusBar from '../components/AppStatusBar';
import Categories from './Categories';
import Banner from './Banner';
import SpecialProduct from './SpecialProduct';




export default function HomeScreen(navigation) {
  const [user, setUser] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);



  useEffect(async () => {
    let user = await getUserDetails();
    setUser(user);

  }, []);



  return (
    <View  style={styles.container}>
    <AppStatusBar />
      <ScrollView 
        nestedScrollEnabled={true}>
        <View>
          <SafeAreaView>
         
            <Banner />
          </SafeAreaView>
        </View>
        <View>
       
          <Categories navigation ={navigation}/>
          
        </View>    
        
        <View>
        <SpecialProduct navigation ={navigation} />
      </View>  
      </ScrollView>
     
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingBottom:100


  },
});