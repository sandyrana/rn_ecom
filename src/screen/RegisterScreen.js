import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import AppStatusBar from '../components/AppStatusBar';
import Checkbox from "expo-checkbox";
import Loading from '../components/Loading';
import { BASE_URL } from '../axios/Api';
import { setUserDetails } from '../utils/LocalStorage';
import { showToastWithGravityAndOffset } from '../utils/Toast'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';




export default function LoginScreen({ navigation }) {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setPassword] = useState("");
  const [copassword, setcoPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);



  const submitHandler = () => {
    setIsLoaded(true);
    fetch(BASE_URL +"/login.php", {
      method: 'POST',
        body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        cpassword: copassword,
        image:base64,
        type: 'Register',



      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
      console.log(responseJson)
        if (responseJson.status === 0) {
          setIsLoaded(false);
          showToastWithGravityAndOffset(responseJson.msg)
        } else if (responseJson.status === 300) {
          setIsLoaded(false);
          showToastWithGravityAndOffset(responseJson.msg)
        }else if(responseJson.status === 201){
          setIsLoaded(false);
          showToastWithGravityAndOffset(responseJson.msg)
        } else if (responseJson.status === 301) {
          setIsLoaded(false);
          showToastWithGravityAndOffset(responseJson.msg)
        } else if (responseJson.status === 200) {
          setIsLoaded(false);
          setUserDetails(responseJson.userDetails);
          showToastWithGravityAndOffset(responseJson.msg)
          navigation.replace("HomeScreen");
        }

      })
      .catch((error) => {
        console.error(error);
      });

  }

  const pickImage = async () => {

    
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      //let imageData = "data:image/jpeg;base64," + result.base64;
     // console.log(result.base64)
     
      const base64y = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
      let imageData = "data:image/png;base64,"+base64y
       setImage(result.uri);
       setBase64(imageData);
      //  console.log(base64, 'this is base64****')
      //  console.log(base64y.length)

    }
  };


  return (
    <View style={styles.container}>
  
      <AppStatusBar />
      {isLoaded ? <Loading /> : null}
      <View style={styles.inputView}>

        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          autoCapitalize="none"
          value={name}
          onChangeText={(actualData) => setname(actualData)}

        />
      </View>

      <View style={styles.inputView}>

        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          autoCapitalize="none"
          value={email}
          onChangeText={(actualData) => setemail(actualData)}

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
     
     
     

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password."
          placeholderTextColor="#003f5c"
          autoCapitalize="none"
          secureTextEntry={true}
          value={copassword}
          onChangeText={(actualData) => setcoPassword(actualData)}
        />
      </View>
      <View >
      <Text onPress={pickImage} style={{color:"blue"}}>Select Profile Image</Text>
     
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
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
        onPress={() => { submitHandler() }}
      >
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>



      <TouchableOpacity onPress={() => { navigation.replace("Login") }}>
        <Text style={styles.register}>Login?</Text>
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
    zIndex: 10

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