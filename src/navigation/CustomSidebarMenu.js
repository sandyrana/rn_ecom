//This is an example code for Navigation Drawer with Custom Side bar//
import React, { Component } from 'react';
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View,Share } from 'react-native';
import { Ionicons, AntDesign, Entypo,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';
import { getUserDetails, logout } from '../utils/LocalStorage';
import { Base_Image,BASE_URL } from '../axios/Api'
import ToggleSwitch from 'toggle-switch-react-native'

// import Icon from 'react-native-feather1s';

export default class CustomSidebarMenu extends Component {

    constructor() {
        super();
        this.state = {
            user: null,
            fig:false,
            camerlogin:false,
            check:0
        };
        //Setting up the Main Top Large Image of the Custom Sidebar
   

        this.proileImage =
            'https://aboutreact.com/wp-content/uploads/2018/07/sample_img.png';


        this.items = [
            {
                navOptionThumb: <Entypo name="home" size={24} color="black" />,
                navOptionName: 'Home',
                screenToNavigate: 'Home',
            },
            {
                navOptionThumb: <Entypo name="user" size={24} color="black" />,
                navOptionName: 'My Profile',
                screenToNavigate: 'Profile',
            },
            {
									
                navOptionThumb: <MaterialCommunityIcons name="cart" size={24}  />,               
                navOptionName: 'Cart',
                screenToNavigate: 'Cart',
            },


        ];
    }

    async componentDidMount() {
        let user = await getUserDetails();
        this.setState({ user: user });
        if(user.l_image ==1){
            this.setState({ camerlogin: true });
        }
        if(user.l_finger ==1){
            this.setState({ fig: true });
        }
    }

    logoutUser = () => {
        logout();
        this.props.navigation.replace('Login');
    };


    appshare = async() => {
        const result = await Share.share({
            message: 'Comming soon in play store',
          });
       
    };

    apprate = async() => {
        const result = await Share.share({
            message: 'Comming soon in play store',
          });
       
    };

    figLoginWithStatus = () =>{
        if(this.state.fig == true){
        this.setState({ fig: false });      
         
          this.changforfig()
        }else{
        this.setState({ fig: true });          
         this.changforfig()    
        }
      }
      camerloginWithStaut = () =>{
        if(this.state.camerlogin == true){
        this.setState({ camerlogin: false });         
          this.changforcam()
        }else{
        this.setState({ camerlogin: true });          
        this.changforcam()
          
        }
      }

      changforcam = () => {
        if(this.state.camerlogin == true){
            this.setState({check:1})      
         }else{
            this.setState({check:0})
    
         }
           fetch(BASE_URL + "/login.php", {
             method: 'POST',
             body:JSON.stringify({
               email:this.state.user.email,
               type:"cal",
               value:this.state.check
             })
             })
             .then((response) => response.json())
             .then((responseJson) => {
            //    setIsLoaded(false);
            //    showToastWithGravityAndOffset(responseJson.msg)
             
             })
             .catch((error) => {
               console.error(error);
             });
       
         }

    changforfig =  () =>{
     if(this.state.fig == true){
        this.setState({check:1})      
     }else{
        this.setState({check:0})

     }
        fetch(BASE_URL + "/login.php", {
            method: 'POST',
            body:JSON.stringify({
              email:this.state.user.email,
              type:"finlo",
              value: this.state.check
            })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
             // setIsLoaded(false);
             // showToastWithGravityAndOffset(responseJson.msg)
            
            })
            .catch((error) => {
              console.error(error);
            });
    }

    getActiveRouteState = name => {
        let active = false;
        if (this.props.state !== undefined) {
            let activeIndex = this.props.state.index;
            let activeRouteName = this.props.state.routes[activeIndex].name;
            if (activeRouteName === name) {
                active = true;
            }
        }
        return active;
    };

    render() {
        return (
            <View style={styles.sideMenuContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.profileContainer}>



                        {this.state.user !== null ? (
                            <Image
                                source={{ uri: Base_Image + this.state.user.image }}
                                style={styles.sideMenuProfileIcon}
                            />
                        ) : null}


                        {this.state.user !== null ? (
                            <View>
                                <Text style={styles.title}>{this.state.user.name}</Text>
                                <Text style={styles.email}>{this.state.user.email}</Text>
                            </View>
                        ) : null}



                    </View>

                    <View
                        style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#e2e2e2',
                        }}
                    />

                    <View style={{ width: '100%' }}>
                        {this.items.map((item, key) => (

                            <TouchableOpacity
                                onPress={() => {
                                    global.currentScreenIndex = key;
                                    this.props.navigation.navigate(item.screenToNavigate);
                                }}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingTop: 15,
                                    paddingBottom: 15,
                                    marginTop: 0,
                                    marginBottom: 0,
                                   
                                    backgroundColor: this.getActiveRouteState(
                                        item.screenToNavigate,
                                    )
                                        ? '#F7F7F7'
                                        : "white",
                                }}
                                key={key}>
                                <View style={{ marginRight: 15, marginLeft: 20 }}>

                                    {item.navOptionThumb}

                                </View>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: this.getActiveRouteState(item.screenToNavigate)
                                            ? 'black'
                                            : 'black',
                                    }}
                                >
                                    {item.navOptionName}
                                </Text>
                            </TouchableOpacity>
                        ))}

                        <View
                            style={{
                                flexDirection: 'row',
                                paddingTop: 10,
                                paddingBottom: 0,
                            }}>
                            <View style={{ marginRight: 15, marginLeft: 20 }}>
                            <Ionicons name="finger-print" size={24} color="black" />
                            </View>
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: 'black',
                                }}
                                >
                                Finger
                            </Text>
                            <ToggleSwitch style={{ marginBottom: 20,marginLeft:'40%' }}                          
                                isOn={this.state.fig}
                                onColor="green"
                                offColor="red"
                                size="small"
                                onToggle={() => {
                                    this.figLoginWithStatus();
                                }}
                            />

                        </View>

                     <View
                        style={{
                            flexDirection: 'row',
                            paddingTop: 10,
                            paddingBottom: 10,
                        }}>
                        <View style={{ marginRight: 15, marginLeft: 20 }}>
                        <MaterialCommunityIcons name="image-filter-center-focus" size={24} color="black" />
                        </View>
                        <Text
                            style={{
                                fontSize: 15,
                                color: 'black',
                            }}
                           >
                            Image
                        </Text>
                        <ToggleSwitch style={{ marginBottom: 20,marginLeft:'40%' }}
                            isOn={this.state.camerlogin}
                            onColor="green"
                            offColor="red"                           
                            size="small"
                            onToggle={() => {
                                this.camerloginWithStaut();
                            }}

                        />

                        </View> 
                        

                        <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingTop: 10,
                            paddingBottom: 10,
                        }}>
                        <View style={{ marginRight: 15, marginLeft: 20 }}>
									<MaterialIcons name="share" size={24} color="black" />
                           
                        </View>
                        <Text
                            style={{
                                fontSize: 15,
                                color: 'black',
                            }}
                            onPress={() => {
                                this.appshare();
                            }}
                            >
                            App Share
                        </Text>
                    </View>

                    <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: 10,
                        paddingBottom: 10,
                    }}>
                    <View style={{ marginRight: 15, marginLeft: 20 }}>
                                <MaterialIcons name="star" size={24} color="black" />
                       
                    </View>
                    <Text
                        style={{
                            fontSize: 15,
                            color: 'black',
                        }}
                        onPress={() => {
                            this.apprate();
                        }}
                        >
                        App Rate
                    </Text>
                </View>


                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}>
                            <View style={{ marginRight: 15, marginLeft: 20 }}>
                                <AntDesign name="logout" size={24} color="black" />
                            </View>
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: 'black',
                                }}
                                onPress={() => {
                                    this.logoutUser();
                                }}>
                                Logout
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
//const BAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;
const styles = StyleSheet.create({
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
    },
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    title: {
        // fontFamily: Font.primarySemiBold,
        // color: Color.black,
        fontSize: 16,
        marginLeft: 10,
    },
    email: {
        fontSize: 10,
        marginLeft: 10,
        color: "grey"
    },

    profileContainer: {
        width: '100%',
        height: 80,
        // marginTop: BAR_HEIGHT,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: Color.iconBG,
        paddingLeft: 20,
        paddingRight: 20,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        // backgroundColor: Color.colorPrimary,
        display: 'flex',
    },
});
