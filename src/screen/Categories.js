import { View, Text ,StyleSheet,FlatList,
  TouchableHighlight,TouchableOpacity,Image
  ,ScrollView,Dimensions,SafeAreaView} from 'react-native'
import React ,{ useLayoutEffect,useEffect,useState }from 'react'
// import {categories} from '../data/Data'
import { Base_Image,BASE_URL } from '../axios/Api'


export default function CategoriesScreen(props) {
 
  const { navigation, route } = props.navigation;
  // const { width:viewportWidth } = Dimensions.get('screen');
 const [categories,setCategories] = useState([]);

  useEffect(() =>{
    fetch(BASE_URL + "/fetch_categories.php", {
      method: 'GET',     
    })
      .then((response) => response.json())
      .then((responseJson) => {  
        setCategories(responseJson.value)    
      })
      .catch((error) => {
       
      });
  },[])
  const catWiseProduct = (item) => {
    navigation.navigate("CategoryWiseProduct",item={item});    
     
  }

    const renderCategory = ({ item }) => (

      <TouchableOpacity style={{width:"50%"}} 
      onPress={()=>{catWiseProduct(item)}} 
     >
     
      <View style={styles.categoriesItemContainer}>
          <Image style={styles.im} source={{ uri: Base_Image+item.photo_link }} />
          <Text style={styles.categoriesName}>{item.name}</Text>
         
        </View>
    </TouchableOpacity>
     
        
    
    );
  
    return (

      categories.length >= 1 ? (
      <View >
            <Text style={styles.Title}>Shop By Categories</Text>     
          
            <FlatList vertical={true} numColumns={2} data={categories} renderItem={renderCategory}  keyExtractor={item => item.id}  />
   
      </View>
      ):null
    );
  }
  


const styles = StyleSheet.create({
  Title:{
    fontWeight:"bold",
    paddingTop:20,
    paddingLeft:12,
    fontSize:16


  },
    categoriesItemContainer: {
      flex: 1,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 200,
      borderColor: '#cccccc',
      borderWidth: 0.5,
      borderRadius: 20,
     
    },
    im: {
      width: '100%',
      height: 155,
      borderRadius: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
   
    },
    categoriesName: {
      flex: 1,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333333',
      marginTop: 8
    },
    categoriesInfo: {
      marginTop: 3,
      marginBottom: 5
    }
  });