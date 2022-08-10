import { Text, View ,StyleSheet,Image} from 'react-native'
import React, { Component } from 'react'
import {getUserDetails} from '../utils/LocalStorage';
import {Base_Image} from '../axios/Api'


export default class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
        user: null,
    };
  }

  
  async componentDidMount() {
    let user = await getUserDetails();   
    // console.log(user)      
    this.setState({user: user});
    // console.log(Base_Image+this.state.user.image)
  }
  render() {
    return (
      
      <View style={styles.container}>
      
     {/*<Image  style={styles.image} source={require('../assets/images/rana.jpg')} /> */}
     
     
            {this.state.user !== null ? (
              <View>
              <Image 
              source={{ uri: Base_Image+this.state.user.image}}
              style={styles.image}
            />
              <Text >Name: {this.state.user.name}</Text>
              <Text >Email: {this.state.user.email}</Text>
              </View>
            
            

          ) : null}
     
      </View>

    )
  }
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
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