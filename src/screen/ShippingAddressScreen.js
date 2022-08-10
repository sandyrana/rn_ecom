import { View, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, TouchableHighlight } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import {getUserDetails} from '../utils/LocalStorage';
import { showToastWithGravityAndOffset } from '../utils/Toast'
import { Base_Image, BASE_URL } from '../axios/Api'
import Loading from '../components/Loading';


export default function ShippingAddressScreen(props) {

    const [name, setName] = useState(null)
    const [mobile, setMobile] = useState(null)
    const [pincode, setPincode] = useState(null)
    const [houseno, setHouseno] = useState(null)
    const [village, setVillage] = useState(null)
    const [landmark, setLandmark] = useState(null)
    const [town, setTown] = useState(null)
    const [state, setState] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false);




    useLayoutEffect(() => {

        props.navigation.setOptions({
            // headerTransparent: "true",
            title: "Shipping Address",
            // headerLeft: () => (
            //   <BackButton
            //     onPress={() => {
            //       navigation.goBack();
            //     }}
            //   />
            // ),
            // headerRight: () => <View />,
        });
    }, []);

    const validation = () =>{
       if(!name || !mobile || !pincode || !houseno || !village || !landmark || !town || !state){
           return false
       }
      return true
    }

    const SubmitEvent = async() => {
      let check = await validation();
      let user = await getUserDetails();
     if(check === true){
        setIsLoaded(true);
        fetch(BASE_URL + "/addShippingAddress.php", {
          method: 'POST',
          body: JSON.stringify({
            name: name,
            mobile: mobile,
            pincode: pincode,
            houseno:houseno,
            village:village,
            landmark:landmark,
            town:town,
            state:state,
            username:user.email,

          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.status === 200) {
            
              setIsLoaded(false);
              showToastWithGravityAndOffset(responseJson.msg)
              props.navigation.navigate("CheckoutScreen");
            } else {
              setIsLoaded(false);
              showToastWithGravityAndOffset(responseJson.msg)
            }
    
    
          })
          .catch((error) => {
          //  setIsLoaded(false);
            console.error(error);
          });
     }else{
         alert("Please fill the all details.")
     }
      
      }

    return (
        <View style={styles.container}>
      {isLoaded ? <Loading /> : null}

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 45,padding:10 }}>
                <KeyboardAvoidingView>

                    <View style={styles.datacontain}>
                        <Text style={[styles.label, name ? styles.textinvalid : styles.textvalid]}>Full Name :</Text>
                        <TextInput
                            style={styles.TextInput}
                            // placeholder="Full Name"
                            // placeholderTextColor="lightgrey"
                            autoCapitalize="none"
                            value={name}
                            onChangeText={(actualData) => setName(actualData)}

                        />
                    </View>

                    <View style={styles.datacontain}>
                        <Text style={styles.label}>Mobile Number :</Text>
                        <TextInput
                            style={styles.TextInput}
                            // placeholder="Mobile Number"
                            // placeholderTextColor="lightgrey"
                            autoCapitalize="none"
                        value={mobile}
                        onChangeText={(actualData) => setMobile(actualData)}

                        />
                    </View>

                    <View style={styles.datacontain}>
                        <Text style={styles.label}>Pincode :</Text>
                        <TextInput
                            style={styles.TextInput}
                            // placeholder="Pincode"
                            // placeholderTextColor="lightgrey"
                            autoCapitalize="none"
                        value={pincode}
                        onChangeText={(actualData) => setPincode(actualData)}

                        />
                    </View>

                    <View style={styles.datacontain}>
                        <Text style={styles.label}>Flat, House no., Building, Company, Apartment :</Text>
                        <TextInput
                            style={styles.TextInput}
                            // placeholder="Flat, House no., Building, Company, Apartment"
                            // placeholderTextColor="lightgrey"
                            autoCapitalize="none"
                        value={houseno}
                        onChangeText={(actualData) => setHouseno(actualData)}

                        />
                    </View>


                    <View style={styles.datacontain}>
                        <Text style={styles.label}>Area, Street, Sector, Village :</Text>
                        <TextInput
                            style={styles.TextInput}
                            // placeholder="Area, Street, Sector, Village"
                            // placeholderTextColor="lightgrey"
                            autoCapitalize="none"
                        value={village}
                        onChangeText={(actualData) => setVillage(actualData)}

                        />
                    </View>

                    <View style={styles.datacontain}>
                        <Text style={styles.label}>Landmark :</Text>
                        <TextInput
                            style={styles.TextInput}
                            // placeholder="Landmark"
                            // placeholderTextColor="lightgrey"
                            autoCapitalize="none"
                        value={landmark}
                        onChangeText={(actualData) => setLandmark(actualData)}

                        />
                    </View>

                    <View style={styles.datacontain}>
                        <Text style={styles.label}>Town/City :</Text>
                        <TextInput
                            style={styles.TextInput}
                            // placeholder="Town/City"
                            // placeholderTextColor="lightgrey"
                            autoCapitalize="none"
                        value={town}
                        onChangeText={(actualData) => setTown(actualData)}

                        />
                    </View>

                    <View style={styles.datacontain}>
                        <Text style={styles.label}>State :</Text>
                        <TextInput
                            style={styles.TextInput}
                            // placeholder="State"
                            // placeholderTextColor="lightgrey"
                            autoCapitalize="none"
                        value={state}
                        onChangeText={(actualData) => setState(actualData)}

                        />
                    </View>


                </KeyboardAvoidingView>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableHighlight style={styles.bottomButtons} onPress={() =>SubmitEvent()}>
                    <Text style={styles.footerText}>Submit</Text>
                </TouchableHighlight>

            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // margin: 10,
        //   justifyContent: 'center',
        //   alignItems: 'center',
backgroundColor:'white'

    },
    textvalid: {
        // borderWidth: 2,
    },
    textinvalid: {
        borderColor: 'red',
    },

    TextInput: {
        height: 50,
        //   flex: 1,
        padding: 10,
        //   marginLeft: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'lightgrey',
        color: 'lightgrey',
        marginTop: 2
        //   placeholderTextColor:'red'


    },
    datacontain: {
        marginTop: 10
    },
    label: {
        color: 'lightgrey'
    },
    footer: {
        position: 'absolute',
        flex: 0.1,
        left: 0,
        right: 0,
        bottom: -10,
        backgroundColor: 'lightblue',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
    },
    footerText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 20,
        // fontWeight:'bold'
    },
    bottomButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        // borderWidth: 1,
        // borderColor: '#fff',
        height: '100%',
    },
});