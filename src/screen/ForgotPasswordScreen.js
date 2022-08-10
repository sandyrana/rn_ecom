import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import AppStatusBar from '../components/AppStatusBar';
import Loading from '../components/Loading';
import { BASE_URL } from "../axios/Api";
import { showToastWithGravityAndOffset } from '../utils/Toast'


export default function ForgetPasswordScreen({ navigation }) {
  const [username, setUsername] = useState();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [copassword, setCoPassword] = useState("");
  const [checkshowhide, setCheckshowhideAgree] = useState(false);
  const [agreeSendOtp, setagreeSendOtp] = useState(false);
  const [agreeSubmit, setagreeSubmit] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getData = () => {
    if (username.length === 10) {
      setagreeSendOtp(true);
    } else {
      setagreeSendOtp(false)
    }
  }

  const sendOtp = () => {
    setIsLoaded(true);
    fetch(BASE_URL + "/login.php", {
      method: 'POST',
      body: JSON.stringify({
        mobile: username,
        type: 'SENDOTP',
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.status === 0) {
          setIsLoaded(false);
          showToastWithGravityAndOffset(responseJson.msg)
        } else if (responseJson.status === 200) {
          setIsLoaded(false);
          setCheckshowhideAgree(true)
          showToastWithGravityAndOffset(responseJson.msg)
        }

      })
      .catch((error) => {
        console.error(error);
      });

  }
  const getSubmitData = (data) => {
    if (otp != '' && password != '' && copassword != '') {
      setagreeSubmit(true)
    }
  }

  const submitHandler = () => {
    setIsLoaded(true);
    fetch(BASE_URL + "/login.php", {
      method: 'POST',
      body: JSON.stringify({
        mobile: username,
        otp: otp,
        password: password,
        cpassword: copassword,
        type: 'Forgot Password',
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
        } else if (responseJson.status === 301) {
          setIsLoaded(false);
          showToastWithGravityAndOffset(responseJson.msg)
        } else if (responseJson.status === 200) {
          setIsLoaded(false);
          //setCheckshowhideAgree(true)
          showToastWithGravityAndOffset(responseJson.msg)
          navigation.replace('Login')
        }

      })
      .catch((error) => {
        console.error(error);
      });
  }




  return (
    <View style={styles.container}>
      <AppStatusBar />
      {isLoaded ? <Loading /> : null}
      {
        !checkshowhide ? (

          <View style={{ width: "90%", alignItems: "center" }}>
            <TextInput style={styles.inputStyle}
              placeholder="Enter Register Mobile Number."
              autoCapitalize="none"
              keyboardType='numeric'
              maxLength={10}
              value={username}
              onChangeText={(actualData) => setUsername(actualData)}
              onKeyPress={() => { getData() }}
            >
            </TextInput>
            <TouchableOpacity
              style={[styles.SendOTP, { backgroundColor: agreeSendOtp ? "lightblue" : "lightgrey" }]}
              disabled={!agreeSendOtp}

              onPress={() => { sendOtp() }}
            >
              <Text style={styles.SendOTPText}>Send OTP</Text>
            </TouchableOpacity>
          </View>

        ) : (
          <View style={{ width: "90%", alignItems: "center" }}>
            <TextInput style={styles.inputStyle}
              placeholder="Enter OTP"
              autoCapitalize="none"
              value={otp}
              maxLength={6}
              keyboardType='numeric'
              onChangeText={(actualData) => setOtp(actualData)}
              onKeyPress={() => { getSubmitData(otp) }}
            >
            </TextInput>

            <TextInput style={styles.inputStyle}
              placeholder="Enter Password"
              autoCapitalize="none"
              value={password}
              secureTextEntry={true}
              onChangeText={(actualData) => setPassword(actualData)}
              onKeyPress={() => { getSubmitData(password) }}
            >
            </TextInput>
            <TextInput style={styles.inputStyle}
              placeholder="Confirm Enter Password"
              autoCapitalize="none"
              value={copassword}
              secureTextEntry={true}
              onChangeText={(actualData) => setCoPassword(actualData)}
              onKeyPress={() => { getSubmitData(copassword) }}
            >
            </TextInput>

            <TouchableOpacity
              style={[styles.SendOTP, { backgroundColor: agreeSubmit ? "lightblue" : "lightgrey" }]}
              disabled={!agreeSubmit}
              onPress={() => { submitHandler() }}

            >
              <Text style={styles.SendOTPText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )
      }









      <View style={styles.bottomImage}>
        <Image source={require('../assets/images/thumb1.png')} />
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
  inputStyle: {
    borderWidth: 1,
    borderColor: "lightgrey",
    width: "90%",
    height: 40,
    padding: 5,
    borderRadius: 25,
    color: "grey",
    marginTop: 10,
  },
  SendOTP: {
    marginTop: 10,
    width: "90%",
    height: 40,
    padding: 10,
    borderRadius: 25,
    backgroundColor: "lightgrey"
  },
  SendOTPText: {
    color: "grey",
    textAlign: "center",
    alignItems: "center",
  },
  bottomImage: {
    height: 150,
    width: 200,
    position: 'absolute',
    bottom: 15,
    right: 80,
  },

});