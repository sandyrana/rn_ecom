import { StyleSheet, Button, Text, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image, ActivityIndicator, TextInput, Alert, TouchableHighlight } from 'react-native';
import Loading from '../components/Loading';
import { showToastWithGravityAndOffset } from '../utils/Toast'
import React, { useEffect, useState, useFocusEffect, useLayoutEffect } from 'react'
import { getUserDetails } from '../utils/LocalStorage';
import { Base_Image, BASE_URL } from '../axios/Api'
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Checkbox from "expo-checkbox";


export default function CheckoutScreen(props) {
  const [checkout, setCheckout] = useState([])
  const [agree, setAgree] = useState(false);
  const [defaultaddress, setDefaultAddress] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [address, setAddress] = useState([])
  // console.log(checkout.cat)
  useLayoutEffect(() => {

    props.navigation.setOptions({
      // headerTransparent: "true",
      title: "Place Order",
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

  const fetchdata = async() => {
    let user = await getUserDetails()
    fetch(BASE_URL + "/fetch_addToCart.php", {
      method: 'POST',
      body: JSON.stringify({
        useremail: user.email,
        type: props.route.params
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setCheckout(responseJson)
      })
      .catch((error) => {
        console.log(error)
      });
  }

const getAddress = async() => {
  //setCheckAddress(false)
  let user = await getUserDetails()
  fetch(BASE_URL + "/getAddress.php", {
    method: 'POST',
    body: JSON.stringify({
      username: user.email,
    })
  })
    .then((response) => response.json())
    .then((responseJson) => {
      
      setIsLoaded(false)

      setAddress(responseJson.data)
      // setCheckout(responseJson)
    })
    .catch((error) => {
  setIsLoaded(false)

      console.log(error)
    })
}

  useEffect(async () => {
    fetchdata();
    getAddress();
   

  }, [])

  const subtotalPrice = () => {
    if (checkout) {
      return checkout.reduce((sum, item) => sum + item.quantity * item.cat.price.split(',')[0], 0);
    }
    return 0;
  }
  const placeOrder = async() =>{
    let user = await getUserDetails();

    // let anbc ={

    // }
    // let orderitems = [];
    // for (let i = 0; i < checkout.length; i++) {
    //   let orderItem = {
    //     itemname: checkout[i].name,
       
    //   };
    //   orderitems.push(orderItem);
    // }

  
    fetch(BASE_URL + "/checkout.php", {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          data: user,
      //  orderDetails:checkout
       cart: checkout,        

        })
  })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(1)
        console.log(responseJson)

          // if (responseJson.status === 1) {
          //     showToastWithGravityAndOffset(responseJson.msg)
          // } else {
          //     showToastWithGravityAndOffset(responseJson.msg)
          // }
      })
      .catch((error) => {
          console.log(error)
      });

  }

  const deleteHandler = async (id) => {
    let user = await getUserDetails()
    fetch(BASE_URL + "/addToCart.php", {
        method: 'POST',
        body: JSON.stringify({
            useremail: user.email,
            product_code: id,
            type: 'remove_addToCart'
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === 200) {
                showToastWithGravityAndOffset(responseJson.msg)
            } else {
                showToastWithGravityAndOffset(responseJson.msg)
            }
        })
        .catch((error) => {
            console.log(error)
        });
}
const changeDefault = async(id) =>{
  setIsLoaded(true)
  let user = await getUserDetails()
  fetch(BASE_URL + "/addShippingAddress.php", {
      method: 'POST',
      body: JSON.stringify({
        username: user.email,
          id: id,
          type: 'chagedefault'
      })
  })
      .then((response) => response.json())
      .then((responseJson) => {
      //  console.log(responseJson)
          if (responseJson.status === 200) {
            getAddress();
            //  showToastWithGravityAndOffset(responseJson.msg)
          } else {
  setIsLoaded(false)
            
              showToastWithGravityAndOffset(responseJson.msg)
          }
      })
      .catch((error) => {
        // console.log(4)
  setIsLoaded(false)

          console.log(error)
      });
}

const editAddress = (item) => {
 props.navigation.navigate('UpdateShippingAddress',item={item})
} 

  return (

    <View style={styles.container}>
    {isLoaded ? <Loading /> : null}
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 50 }}>
        <View style={styles.item}>
          <View style={styles.item_text}>
            <Text style={styles.i}>Total Item</Text>
            <Text style={styles.i}>{checkout.length}</Text>
          </View>
          <View style={styles.item_text}>

            <Text style={styles.y}>Total Price</Text>
            <Text style={styles.y}>&#8377; {subtotalPrice().toFixed(2)}</Text>
          </View>
        </View>

        {
          checkout && checkout.map((item, i) => (
            <View style={styles.item_list} key={i}>
              <View style={{ flexDirection: 'row' }}>
                <Image style={styles.im} source={{ uri: Base_Image + item.cat.photo_link }} />
                <View>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.cat.name}</Text>
                  <Text style={{ color: '#8f8f8f' }}>1kg</Text>
                  <Text style={{ color: 'lightgrey' }}><Text style={styles.old_price}>&#8377; {item.cat.old_price.split(',')[0]}</Text> <Text style={{ color: '#333333', marginBottom: 10, fontWeight: 'bold' }}>&#8377;{item.cat.price.split(',')[0]}</Text></Text>

                </View>
              </View>

              <TouchableOpacity onPress={() => deleteHandler(item.product_code)}>
                <Ionicons name="md-trash" size={25} color="#ee4d2d" />
              </TouchableOpacity>

            </View>
          ))
        }


        <View style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Shiping Details</Text>


       
          {/*  {address && address.map((item, i) => ( */}
        
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop:10}}>
            {address && address.map((item, i) => (
              <View style={{marginRight:10}} key={i}>
               <Checkbox style={{
                position: 'absolute', opacity: 1,
                zIndex: 1, borderColor: 'lightgrey'
              }}
                value={item.defaultaddress == 'Y' ? defaultaddress :false}
               onValueChange={() => changeDefault(item.id)}
                color={item.defaultaddress == 'Y' ? "lightblue" : undefined}
              />
              <TouchableOpacity style={styles.address} onPress={()=>{editAddress(item)}}>
                <Text style={styles.text}>AT :{item.houseno}, {item.village}, {item.town}, {item.state} - {item.pincode}</Text>
                <Text style={styles.text}>Landmark: {item.landmark}</Text>
                <Text style={styles.text}>Mobile: {item.mobile}</Text>

                
              </TouchableOpacity>

          
              </View>

            ))}
              
            
              </ScrollView>
            
         
           
            <Text style={{color:'green'}} onPress={()=>{props.navigation.navigate('ShippingAddressScreen')}}>Add new address!</Text>
       





        </View>

      </ScrollView>


      <View style={styles.footer}>
        <TouchableHighlight style={styles.bottomButtons} onPress={() => placeOrder()}>
          <Text style={styles.footerText}>Place Order</Text>
        </TouchableHighlight>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: 'white', height: '100%' },
  item: { backgroundColor: 'lightblue', borderRadius: 10 },
  i: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  y: { color: 'white', fontSize: 15, fontWeight: 'bold' },

  item_text: { flexDirection: 'row', justifyContent: 'space-between', padding: 5 },
  im: { width: 100, height: 50, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, resizeMode: 'contain' },
  item_list: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, marginTop: 10, padding: 5, borderColor: 'lightgrey', borderRadius: 20 },
  old_price: { textDecorationLine: 'line-through' },
  footer: {
    position: 'absolute', flex: 0.1, left: 0, right: 0, bottom: -10, backgroundColor: 'lightblue', flexDirection: 'row',
    height: 80,
    alignItems: 'center',
  },
  footerText: { alignSelf: 'center', color: 'white', fontSize: 20, },
  bottomButtons: {
    alignItems: 'center', justifyContent: 'center', flex: 1, borderWidth: 1, borderColor: '#fff', height: '100%',
  },
  TextInput: {
    flex: 1,
    padding: 10,
    // marginLeft: 20,
    borderWidth: 1,
    height: 150,
    // width:'50%',

    borderColor: 'lightgrey',
    borderRadius: 5,
    // marginTop:100,
    // position:'absolute'
  },
  address:{
    height:200,
    width:150,
    borderWidth:1,
    borderColor:'lightgrey',
    borderRadius:5,
    padding:15,
  },
  text:{color:'lightgrey'}


})