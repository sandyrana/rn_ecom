import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react';
import AppStatusBar from '../components/AppStatusBar';
import Loading from '../components/Loading';
import Checkbox from "expo-checkbox";
import { BASE_URL } from "../axios/Api";
import { setUserDetails } from '../utils/LocalStorage';
import { showToastWithGravityAndOffset } from '../utils/Toast'


export default function LoginScreen({ navigation }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
 

 
  const SubmitEvent = () => {
    setIsLoaded(true);
    fetch(BASE_URL + "/login.php", {
      method: 'POST',
      body: JSON.stringify({
        email: username,
        password: password,
        type: "Login"
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.status === 200) {
          setUserDetails(responseJson.userDetails);
          setIsLoaded(false);
          showToastWithGravityAndOffset(responseJson.msg)
          navigation.replace("HomeScreen");
        } else {
          setIsLoaded(false);
          showToastWithGravityAndOffset(responseJson.msg)
        }


      })
      .catch((error) => {
        setIsLoaded(false);
        console.error(error);
      });
  }

  
  return (
    <View style={styles.container}>
      <AppStatusBar />
      {isLoaded ? <Loading /> : null}
     
      <View style={styles.inputView}>

        <TextInput
          style={styles.TextInput}
          placeholder="Register Email Id"
          placeholderTextColor="#003f5c"
          autoCapitalize="none"
          value={username}
          onChangeText={(actualData) => setUsername(actualData)}

        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          autoCapitalize="none"
          secureTextEntry={true}
          value={password}
          onChangeText={(actualData) => setPassword(actualData)}
        />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }} >
        <Checkbox
          value={agree}
          onValueChange={() => setAgree(!agree)}
          color={agree ? "lightblue" : undefined}
        />
        <Text style={{ color: 'lightgrey' }}> I have to read terms & condition.</Text>
      </View>
      <TouchableOpacity
        style={[styles.loginBtn, { backgroundColor: agree ? "lightblue" : "lightgrey" },]}
        disabled={!agree}
        onPress={() => { SubmitEvent() }}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>


      <TouchableOpacity
      style={[styles.loginBtn,{backgroundColor:'lightblue'}]}      
      onPress={()=>{navigation.replace('Capture')}}
      >
      <Text style={styles.loginText}>LOGIN With FaceId</Text>
    </TouchableOpacity>


    <TouchableOpacity
    style={[styles.loginBtn,{backgroundColor:'lightblue'}]}      
    >
    <Text style={styles.loginText}>LOGIN With Finger</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => { navigation.replace("ForgetPassword") }}>
        <Text style={styles.forgot_button} >Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { navigation.replace("Register") }}>
        <Text style={styles.register}>Register?</Text>
      </TouchableOpacity>    
        
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    margin: 10,
    resizeMode: 'cover',




  },
  bottomImage: {
    height: 150,
    width: 200,
    position: 'absolute',
    bottom: 15,
    right: 80,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  inputView: {
    backgroundColor: "lightgrey",
    borderRadius: 30,
    width: "90%",
    height: 45,
    marginBottom: 20,

    // alignItems: "center",
  },
  forgot_button: {
    height: 30,
    // marginBottom: 10,
    marginTop: 10,
    color: "blue",

  },
  register: {
    // height: 30,
    // marginBottom: 30,
    // marginTop:10,
    color: "blue",

  },

  loginBtn: {
    width: "90%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "lightgrey",

  },
});