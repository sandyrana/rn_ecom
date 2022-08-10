import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import Loading from '../components/Loading';
import { showToastWithGravityAndOffset } from '../utils/Toast'
import React,{useEffect,useState,useFocusEffect } from 'react'
import { getUserDetails} from '../utils/LocalStorage';
import { Base_Image, BASE_URL } from '../axios/Api'
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';




export default function Cart(props) {
	
	const { navigation, route } = props.navigation;

	const [cartItems,setCartItems] = useState([])
	const [cartItemsIsLoading,setCartLoading] = useState(false)

	useEffect ( async() =>{	
		let user = await getUserDetails()
        fetch(BASE_URL + "/fetch_addToCart.php", {
            method: 'POST',
            body: JSON.stringify({
				useremail: user.email,
			 })
           })
            .then((response) => response.json())
            .then((responseJson) => {
				// console.log(responseJson)
				setCartItems(responseJson)
            })
            .catch((error) => {
            });
	},[cartItems])

	

	const subtotalPrice = () => {
		if(cartItems){
			return cartItems.reduce((sum, item) => sum + item.quantity * item.cat.price.split(',')[0],0 );
		}
		return 0;
	}

	const quantityHandler = (action,i,qty,product_code,size) =>{
		// const newItems = [...cartItems]; // clone the array 
		// console.log(newItems)
		
		// let currentQty = newItems[i]['quantity'];
        let qty1
		if(action == 'more'){
			//newItems[i]['quantity'] = parseInt(currentQty) + 1;
            qty1 = parseInt(qty)+1;
		} else if(action == 'less'){
			//newItems[i]['quantity'] = parseInt(currentQty) > 1 ? parseInt(currentQty) - 1 : 0;
            qty1 = parseInt(qty)-1;
		}
		
		if(qty1 == 0){
			deleteHandler(product_code)
		}else{
			addToCart(qty1,product_code,size)

		}
		  

	}
	const addToCart = async(qty1,product_code,size) =>{
		let user = await getUserDetails()		
        fetch(BASE_URL + "/addToCart.php", {
            method: 'POST',
            body: JSON.stringify({
				useremail: user.email,
				product_code:product_code,
				size:size,
				quantity:qty1
			 })
           })
            .then((response) => response.json())
            .then((responseJson) => {
				if(responseJson.status === 200){
                    // showToastWithGravityAndOffset(responseJson.msg)
                }else{
                    showToastWithGravityAndOffset(responseJson.msg)
                }
            })
            .catch((error) => {
				console.log(error)
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
	const checkout = () => {
		props.navigation.navigate("CheckoutScreen");
	}

  return (
	<View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
	{cartItemsIsLoading ? (
		<Loading />
	) : (
		<ScrollView>	
			{cartItems && cartItems.map((item, i) => (
				<View key={i} style={styles.cartContainer}>
				
					<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
						<TouchableOpacity onPress={() => {/*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/}} style={{paddingRight: 10}}>
							<Image source={{uri: Base_Image + item.cat.photo_link}} style={styles.im} />
						</TouchableOpacity>
						<View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
							<Text numberOfLines={1} style={{fontSize: 15,fontWeight:'bold'}}>{item.cat.name}</Text>
							<Text numberOfLines={1} style={{color: '#8f8f8f'}}>{item.size }</Text>
		                    <Text numberOfLines={1} style={{color: '#333333', marginBottom: 10,fontWeight:'bold'}}>&#8377; {item.quantity * item.cat.price.split(',')[0]}</Text>
							<View style={{flexDirection: 'row'}}>
								<TouchableOpacity onPress={() => quantityHandler('less',i,item.quantity,item.product_code,item.size)} style={styles.minus_plus}>
									<MaterialIcons name="remove" size={20} color="black" />
								</TouchableOpacity>
								<Text style={styles.text}>{item.quantity}</Text>
								<TouchableOpacity onPress={() => quantityHandler('more', i,item.quantity,item.product_code,item.size)} style={styles.minus_plus}>
									<MaterialIcons name="add" size={20} color="black" />
								</TouchableOpacity>
							</View>
						
						</View>
						
					</View>
					<View style={[styles.centerElement, {width: 60}]}>
						<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => deleteHandler(item.product_code)}>
							<Ionicons name="md-trash" size={25} color="#ee4d2d" />
						</TouchableOpacity>
					</View>
				</View>
			))}
		</ScrollView>
	)}
	
	{cartItems &&
		<View style={{backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5}}>
			<View style={{flexDirection: 'row'}}>
				<View style={[styles.centerElement, {width: 60}]}>
					<View style={[styles.centerElement, {width: 32, height: 32}]}>
						<MaterialCommunityIcons name="ticket" size={25} color="#f0ac12" />
					</View>
				</View>
				<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Voucher</Text>
					<View style={{paddingRight: 20}}>
						<TextInput 
							style={{paddingHorizontal: 10, backgroundColor: '#f0f0f0', height: 25, borderRadius: 4}} 
							placeholder="Enter voucher code" 
							value={''}
							onChangeText={(searchKeyword) => {
								
							} }
						/> 
					</View>
				</View>
			</View>
			<View style={{flexDirection: 'row'}}>
			
				<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Select All</Text>
					<View style={{flexDirection: 'row', paddingRight: 20, alignItems: 'center'}}>
						<Text style={{color: '#8f8f8f'}}>SubTotal: </Text>
						<Text>&#8377; {subtotalPrice().toFixed(2)}</Text>
					</View>
				</View>
			</View>
			<View style={{flexDirection: 'row', justifyContent: 'flex-end', height: 32, paddingRight: 20, alignItems: 'center'}}>
				<TouchableOpacity style={[styles.centerElement, {backgroundColor: '#0faf9a', width: 100, height: 25, borderRadius: 5}]} onPress={() => checkout()}>
					<Text style={{color: '#ffffff'}}>Checkout</Text>
				</TouchableOpacity>
			</View>
		</View>
	}


	{cartItems == null &&
		<View><Text>fdsfsd</Text></View>

	}
</View>
  )
}


const styles = StyleSheet.create({
	centerElement: {justifyContent: 'center', alignItems: 'center'},
	cartContainer:{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120,padding:10},
	im: {width: 100,height: 110,borderBottomLeftRadius: 0,borderBottomRightRadius: 0,resizeMode: 'contain'},
	minus_plus: {alignItems: 'center',marginTop:3,color:'black'},
    text: {fontSize: 20,color:'black',},
});