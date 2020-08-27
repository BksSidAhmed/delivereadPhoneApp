import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Drawer} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
// Action Redux
import { RESET_ACTION } from '../redux/actions/resetActions'
// Redux
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class DrawerContent extends React.Component {

    signOut = () => {
        this.props.RESET_ACTION()
    }
    render() {
        return(
            <View style={{flex:1}}>
                <DrawerContentScrollView>
                    <View style={styles.drawerContent}>
                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <FontAwesome5 
                                    name="home" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Home"
                                onPress={() => {this.props.navigation.navigate('Home')}}
                            />
                        </Drawer.Section>
                        <View style = {{flexDirection : 'row', flex : 1}}>
                            <Text style = {{fontSize : 15, top: 7, marginLeft: 5}}>Categorie</Text>
                            <View style = {{borderBottomWidth: 1, borderBottomColor : 'grey' , flex : 1, marginLeft: 8}}></View>
                        </View>
                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <FontAwesome5 
                                    name="book" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Roman"
                                onPress={() => {this.props.navigation.navigate('Roman')}}
                            />
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <FontAwesome5 
                                    name="mandalorian" 
                                    color={color}
                                    size={size}
                                    />
                                )}
                                label="Manga"
                                onPress={() => {this.props.navigation.navigate('Manga')}}
                            />
                        </Drawer.Section>
                    </View>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem 
                        icon={({size}) => (
                            <Icon 
                            name="exit-to-app" 
                            color='#EF800B'
                            size={size}
                            />
                        )}
                        label="Sign Out"
                        onPress={() => {this.signOut()}}
                    />
                </Drawer.Section>
            </View>
        );
    }   
}   

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        justifyContent : 'flex-end',
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
  const mapStateToProps = (state) => {
    // Redux Store --> Component
   return {
       token: state.tokenReducer.token,
   }
  }
export default connect(mapStateToProps, {RESET_ACTION}) (DrawerContent)