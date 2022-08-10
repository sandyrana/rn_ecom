import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, Button, Pressable, ScrollView } from 'react-native'
import React,{useLayoutEffect,useState,useEffect} from 'react'
import { Base_Image, BASE_URL } from '../axios/Api'
import { getUserDetails,getCart,setCart } from '../utils/LocalStorage';
import { showToastWithGravityAndOffset } from '../utils/Toast'

export default function CategoryWiseProduct(props) {  
  const { navigation, route } = props.navigation;
 
  const [catProduct,setCatProduct] =useState([]);
  
  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: props.route.params.item.title,      
      headerTitleStyle: {
        fontSize: 20,
      },
      headerTransparent: true,
      // headerRight: () => <Button title="Next" />,
    });
  },navigation);

  useEffect(()=>{
    getCatWiseProduct()
  },[catProduct])

  const getCatWiseProduct = () =>{
    fetch(BASE_URL + "/fetch_all_product.php", {
      method: 'POST', 
      body:JSON.stringify({
        cat_code:props.route.params.item.id
      }),    
    })
      .then((response) => response.json())
      .then((responseJson) => {  
        setCatProduct(responseJson)    
      })
      .catch((error) => {
       
      });
  }

  const quantityHandler = (action, index,item) => {
    const newItems = [...catProduct]; // clone the array 

let currentQty = newItems[index]['qty'];
   let qty
if(action == 'more'){
 newItems[index]['qty'] = parseInt(currentQty) + 1;
       qty = parseInt(currentQty)+1;
} else if(action == 'less'){
 newItems[index]['qty'] = parseInt(currentQty) > 1 ? parseInt(currentQty) - 1 : 0;
       qty = parseInt(currentQty)-1;
}

if(qty == 0){
  deleteHandler(item.product_code)

}else{
  addToCart(item,qty)  

}
setCatProduct(newItems)    

}
const addToCart = async(item,qty) =>{
    let user = await getUserDetails()
   fetch(BASE_URL + "/addToCart.php", {
       method: 'POST',
       body: JSON.stringify({
         useremail: user.email,
         product_code: item.product_code,
         size: item.size.split(',')[0],
         quantity: item.qty,
        


       })
      })
       .then((response) => response.json())
       .then((responseJson) => {
           if(responseJson.status === 200){
               showToastWithGravityAndOffset(responseJson.msg)
           }else{
               showToastWithGravityAndOffset(responseJson.msg)
           }
       })
       .catch((error) => {

       });
}
const deleteHandler = async(id) =>{
  let user = await getUserDetails()		
      fetch(BASE_URL + "/addToCart.php", {
          method: 'POST',
          body: JSON.stringify({
      useremail: user.email,
      product_code:id,
      type:'remove_addToCart'
     })
         })
          .then((response) => response.json())
          .then((responseJson) => {
      if(responseJson.status === 200){
                  showToastWithGravityAndOffset(responseJson.msg)
              }else{
                  showToastWithGravityAndOffset(responseJson.msg)
              }
          })
          .catch((error) => {
      console.log(error)
          });
}

const  productDetailsScreen = (item) => {
  //console.log(props.navigation)
  // navigation.navigate("ProductDetailsScreen", {item });
  props.navigation.navigate("ProductDetailsScreen",productDetails = {item});    
 

}
  
  return (
    <View style={{backgroundColor:'#fff'}}>
    <ScrollView style={{marginTop:50}}>
    {catProduct && catProduct.map((item, i) => (
        <View key={i} style={styles.categoriesItemContainer}>
            <TouchableOpacity style={{ flexDirection: 'row' }}  onPress={() =>{productDetailsScreen(item)}}>
                <Image style={styles.im} source={{ uri: Base_Image + item.photo_link }} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.categoriesName}>{item.name.trim()}</Text>
                    <Text style={{ color: 'lightgrey' }}>Size: {item.size.split(',')[0]}</Text>

                    <Text style={{ color: 'lightgrey' }}>MRP: <Text style={styles.old_price}> Rs {item.old_price.split(',')[0]}.00</Text></Text>
                    <Text style={styles.price}>Rs {item.price.split(',')[0]}.00</Text>
                </View>
            </TouchableOpacity>

            <View>
                {
                    parseInt(item.qty) === 0 ? (
                        <TouchableOpacity style={styles.addbutton} onPress={() => quantityHandler('more', i, item)}>
                            <Text style={styles.text}>Add</Text>
                        </TouchableOpacity>
                    ) :

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => quantityHandler('less', i, item)} style={styles.minus_plus}>
                                <Text style={styles.text}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.counter_text}>{item.qty}</Text>
                            <TouchableOpacity onPress={() => quantityHandler('more', i, item)} style={styles.minus_plus}>
                                <Text style={styles.text}>+</Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        </View>
    ))}
</ScrollView>
        </View>

  )
}


const styles = StyleSheet.create({
  Title: {
      fontWeight: "bold",
      paddingTop: 20,
      paddingLeft: 12,
      fontSize: 16


  },
  categoriesItemContainer: {
    flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: 'lightgrey', alignItems: 'center'
   


  },
  im: {
      width: 150,
      height: 125,
      // borderRadius: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      resizeMode: 'contain'

  },
  categoriesName: {
      fontSize: 20,
      // textAlign: 'center',
      color: '#333333',
      marginTop: 8,
      // marginLeft: 5
  },
  old_price: {
      // textDecoration: 'line-through' ,
      textDecorationLine: 'line-through',

  },
  price: {
      fontWeight: 'bold',
      fontSize: 16
  },
  size: {marginLeft: 10,color: 'lightgrey'},
  categoriesInfo: {marginTop: 3,marginBottom: 5},
  addbutton: {width: 90, borderRadius: 25,height: 30,alignItems: "center",justifyContent: "center",marginTop: 10,backgroundColor: "lightgrey"},
  minus_plus: {width: 30,height: 30,alignItems: 'center',borderRadius: 5,backgroundColor: 'lightgrey',marginTop:5},
  text: {fontSize: 20,color:'grey'},
  counter_text:{fontSize:20,alignItems:'center',color:'grey',margin:5}
});