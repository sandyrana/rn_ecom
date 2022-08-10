import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import base64 from 'react-native-base64'
import * as FileSystem from 'expo-file-system';
import AppStatusBar from '../components/AppStatusBar';
import Loading from '../components/Loading';
import { BASE_URL,Base_Image } from "../axios/Api";


export default function Add({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [agree, setAgree] = useState(false);
  const [base64, setBase64] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);




  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestCameraPermissionsAsync();

    setCameraPermission(cameraPermission.status === 'granted');


    if (
     
      cameraPermission.status !== 'granted'
    ) {
      alert('Permission for media access needed.');
    }
  };

  useEffect(() => {
    permisionFunction();
  //  matchFace();
  }, []);

  const takePicture = async () => {
    setIsLoaded(true);
    if (camera) {
      const data = await camera.takePictureAsync(null);
      const base64y = await FileSystem.readAsStringAsync(data.uri, { encoding: 'base64' });    
      setImageUri(data.uri);
      // setBase64(base64y);

                    fetch(BASE_URL + "/loginface.php", {
                      method: 'POST',
                      body: JSON.stringify({
                        deviceId: '123456',                      
                      }),
                      })
                      .then((response) => response.json())
                      .then((responseJson) => {
                        setUser(responseJson);
                        setTimeout(function(){ caller()}, 2000);
                      
                       
                       setIsLoaded(false);                   
                      
                      })
                      .catch((error) => {
                       setIsLoaded(false);

                        console.error(error);
                      });
    }
  };
 const caller = async () =>{
    console.log(user)
    
//     const a = await FileSystem.readAsStringAsync('https://sandeep-rana.000webhostapp.com/RestApi/img/465073257.png', { encoding: 'base64' });    
// console.log(a)
 }
  

  // const matchFace = () => {
  // // alert(2)
  //   fetch(BASE_URL + "/loginface.php", {
  //     method: 'GET',
  //     })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //     //  console.log(responseJson)
  //       setData(responseJson) 
      
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  // }
// const chchhchhc = (i)=>{
//   let imageData = "data:image/jpeg;base64,"+ddata.value[i]
//   let imageData1 = "data:image/jpeg;base64,"+imageUri


//   const options = {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       'X-RapidAPI-Host': 'face-verification2.p.rapidapi.com',
//       'X-RapidAPI-Key': '1d15958018mshe1ad6a8c286b568p147655jsnfe4a28991ade'
//     },
//     body: new URLSearchParams({linkFile1:imageData, linkFile2: imageData1})
//   };
  
//   fetch('https://face-verification2.p.rapidapi.com/faceverification', options)
//     .then(response => response.json())
//     .then(response => 
//       console.log(response)
//       )
//     .catch(err => console.error(err));

 


// }
 

  return (
    <View style={styles.container}>
    <AppStatusBar />
    {isLoaded ? <Loading /> : null}
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'}
        />
       
      </View>

      <Button title={'Take Picture'} onPress={takePicture} />
      
      {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  button: {
    flex: 0.1,
    padding: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});