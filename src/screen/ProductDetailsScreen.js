import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableHighlight } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Base_Image, BASE_URL } from '../axios/Api'
import Carousel, { Pagination } from "react-native-snap-carousel";
import { getUserDetails, getCart, setCart } from '../utils/LocalStorage';
import { showToastWithGravityAndOffset } from '../utils/Toast'




export default function ProductDetailsScreen(props) {
  const [activeSlide, setActiveSlide] = useState(0);

  const { navigation, route } = props;
  const { width: viewportWidth } = Dimensions.get("window");

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTransparent: "true",
      title: "Product Details",
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
  const item = route.params.item;
  const title = item.name;
  // console.log(item)
  const photosArray = [
    { id: 1, img: item.photo_link },
    { id: 2, img: item.photo2 },

  ];

  const addToCart = async (action, item) => {
    let user = await getUserDetails()
    fetch(BASE_URL + "/addToCart.php", {
      method: 'POST',
      body: JSON.stringify({
        useremail: user.email,
        product_code: item.product_code,
        size: item.size.split(',')[0],
        quantity: 1,
       
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 200) {
          if (action == 'Buy') {
          
            // if (responseJson.msg == 'Item already added to cart') {
              // showToastWithGravityAndOffset(responseJson.msg)

            //   props.navigation.navigate('Cart')
            // } else {
             props.navigation.navigate('CheckoutScreen')

            // }
          } else {
            showToastWithGravityAndOffset(responseJson.msg)
          }

        } else {
          showToastWithGravityAndOffset(responseJson.msg)
        }
      })
      .catch((error) => {

      });
  }

  const slider1Ref = useRef();

  const checkout = () => {
    props.navigation.navigate("CheckoutScreen");
  }

  const renderImage = ({ item, index }) => {
    return (
      <View style={styles.slide}>

        <Image source={{ uri: Base_Image + item.img }} style={{ width: '100%', height: 300 }} />


      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Carousel
          ref={slider1Ref}
          data={photosArray}
          renderItem={renderImage}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          firstItem={0}
          loop={true}
          autoplay={true}
          autoplayDelay={3000}
          autoplayInterval={3000}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={photosArray.length}
          activeDotIndex={activeSlide}
          dotColor="grey"
          inactiveDotColor="lightgrey"

        />

        <View style={styles.dataContainer}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{item.name}</Text>
          <Text style={{ color: 'lightgrey', fontSize: 20 }}>{item.size.split(',')[0]}</Text>
          <Text style={{ color: 'lightgrey' }}>MRP: <Text style={styles.old_price}> Rs {item.old_price.split(',')[0]}.00</Text></Text>
          <Text style={styles.price}>Rs {item.price.split(',')[0]}.00</Text>
          <Text style={{ color: 'lightgrey' }}>{item.small_details}</Text>

        </View>


      </ScrollView>
      <View style={styles.footer}>
        <TouchableHighlight style={styles.bottomButtons} onPress={() => addToCart('Add', item)}>
          <Text style={styles.footerText}>Add To Cart</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.bottomButtons} onPress={() => addToCart('Buy', item)}>
          <Text style={styles.footerText}>Buy Now</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%'
  },
  dataContainer: {
    padding: 15,
  },
  old_price: {
    // textDecoration: 'line-through' ,
    textDecorationLine: 'line-through',

  },
  price: {
    fontWeight: 'bold',
    fontSize: 16
  },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    height: 80,
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
    borderWidth: 1,
    borderColor: '#fff',
    height: '100%',
  },

})