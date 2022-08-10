import { View, Text } from 'react-native'
import React,{useEffect,useState} from 'react'
import { ImageSlider } from "react-native-image-slider-banner";
import {banner} from '../data/Data';
import { Base_Image,BASE_URL } from '../axios/Api'

export default function Banner() {
 const [slider,setSlider] = useState([]);
  useEffect(() =>{
    fetch(BASE_URL + "/fetch_banners.php", {
      method: 'GET',
     
    })
      .then((response) => response.json())
      .then((responseJson) => {
       
        setSlider(responseJson)
        // console.log(responseJson)
       
      })
      .catch((error) => {
       
      });
  },[])
  return (
   
    slider.length >= 1  ? (
     <ImageSlider 
              data={slider}
              autoPlay={true}
              timer={2000}    
              caroselImageStyle={{height: 250}}
              showIndicator={true}            
              
              />
    
    

  ) : null
   
  )
}