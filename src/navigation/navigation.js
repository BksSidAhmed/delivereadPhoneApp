// Dependance React 
import * as React from 'react';
import {View, Text} from 'react-native'
// Dependance React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
// Components
import Librairy from '../screens/librairy';
import Profile from '../screens/profile';
import Books from '../screens/Home/books';
import BooksDetail from '../screens/Home/booksDetail';
import Login from '../screens/Auth/login';
import Register from '../screens/Auth/register';
import RegisterLogin from '../screens/Auth/registerLogin';

import Reservation from '../screens/reservation';
import Adresse from '../screens/adresse';
import DrawerContent from '../components/drawerContent'
import DrawerContentLivreur from '../components/drawerContentLivreur'
import Livreur from '../screens/Livreur/livreur'
import CommandeDetail from '../screens/Livreur/commandeDetail'
//ADMIN 
import Admin from '../screens/admin/admin'
import AdminDetail from '../screens/admin/adminDetails'

import LibrairyRender from '../screens/Library/librairyRender'
import LibrairyItem from '../components/librairyItem'
import Subscription from '../screens/Payment/subscription'
import TypeSubscription from '../screens/Payment/typeSubscription'

// Components Categorie
import manga from '../screens/Categorie/manga'
import policier_thriller from '../screens/Categorie/policier_thrillers'
import roman from '../screens/Categorie/roman'
import sf_Fantasy from '../screens/Categorie/sf_Fantasy'
// Dependance UI
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Api
import { getToken } from '../api/index'
// Action Redux
import {loginToken} from '../redux/actions/tokenAction'
import { RESET_ACTION } from '../redux/actions/resetActions'
import { loginId } from '../redux/actions/idUserAction'
// Redux
import { connect } from 'react-redux'
import { AuthContext } from "../context/context";

import UserInactivity from 'react-native-user-inactivity'
import BackgroundTimer from 'react-native-user-inactivity/lib/BackgroundTimer'

const AdminStack = createStackNavigator();
function AdminStackScreen() {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen 
          name="admin" 
          component={Admin}
          options =  {{
            title: 'Deliveread ',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#EF800B',
            },
            headerTintColor: '#fff',
          }}
      />
      <AdminStack.Screen 
          name="adminDetail" 
          component={AdminDetail}
          options =  {{
            title: 'Deliveread ',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FF9800',
            },
            headerTintColor: '#fff',
          }}
      />
    </AdminStack.Navigator>
  );
}

const LivreurStack = createStackNavigator();
function LivreurStackScreen() {
  return (
    <LivreurStack.Navigator>
      <LivreurStack.Screen 
          name="livreur" 
          component={Livreur}
          options =  {{
            title: 'Deliveread ',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#EF800B',
            },
            headerTintColor: '#fff',
          }}
      />
      <LivreurStack.Screen 
          name="commandeDetail" 
          component={CommandeDetail}
          options =  {{
            title: 'Deliveread ',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FF9800',
            },
            headerTintColor: '#fff',
          }}
      />
    </LivreurStack.Navigator>
  );
}
const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
          name="librairy" 
          component={Librairy}
          options =  {{
            title: 'Deliveread ',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#EF800B',
            },
            headerTintColor: '#fff',
          }}
      />
       <HomeStack.Screen 
          name="librairyRender" 
          component={LibrairyRender}
          options =  {{
            title: 'Deliveread ',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#EF800B',
            },
            headerTintColor: '#fff',
          }}
      />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen 
          name="Settings" 
          component={Profile} 
          options =  {{
            title: 'Deliveread ',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#EF800B',
            },
            headerTintColor: '#fff',
          }}
        />
    </SettingsStack.Navigator>
  );
}

const BooksStack = createStackNavigator();
function BooksStackScreen() {
  return (
    <BooksStack.Navigator>
      <BooksStack.Screen 
          name="books" 
          component={Books} 
          options =  {{
            title: 'Deliveread ',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#EF800B',
            },
            headerTintColor: '#fff',
          }}
        />
        <BooksStack.Screen 
          name="BooksDetail" 
          component={BooksDetail} 
          options =  {{
            title: 'Deliveread ',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#EF800B',
            },
            headerTintColor: '#fff',
          }}
        />
        <BooksStack.Screen 
          name="Reservation" 
          component={Reservation} 
          options =  {{
            title: 'Deliveread ',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#EF800B',
            },
            headerTintColor: '#fff',
          }}
        />
        <BooksStack.Screen 
          name="Adresse" 
          component={Adresse} 
          options =  {{
            title: 'Livraison ',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#EF800B',
            },
            headerTintColor: '#fff',
          }}
        />
        <BooksStack.Screen 
          name="Subscription" 
          component={Subscription} 
          options =  {{
            title: 'Subscription ',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#EF800B',
            },
            headerTintColor: '#fff',
          }}
        />
        <BooksStack.Screen 
          name="TypeSubscription" 
          component={TypeSubscription} 
          options =  {{
            title: 'Subscription',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#EF800B',
            },
            headerTintColor: '#fff',
          }}
        />
    </BooksStack.Navigator>
  );
}
const AuthStack = createStackNavigator();
function AuthStackScreen() {
  return(
            <AuthStack.Navigator
            headerMode="none">
              <AuthStack.Screen 
                  name="Login" 
                  component={Login}
                  options =  {{
                    title: 'Deliveread ',
                    headerTitleAlign: 'center',
                    headerStyle: {
                      backgroundColor: '#EF800B',
                    },
                    headerTintColor: '#fff',
                  }}
              />              
              <AuthStack.Screen 
                  name="Register" 
                  component={Register}
                  options =  {{
                    title: 'Creation de Compte ',
                    headerTitleAlign: 'center',
                    headerStyle: {
                      backgroundColor: '#EF800B',
                    },
                    headerTintColor: '#fff',
                  }}
              />
              <AuthStack.Screen 
                  name="RegisterLogin" 
                  component={RegisterLogin}
                  options =  {{
                    title: 'Creation de Compte Login',
                    headerTitleAlign: 'center',
                    headerStyle: {
                      backgroundColor: '#EF800B',
                    },
                    headerTintColor: '#fff',
                  }}
              />
        </AuthStack.Navigator> 
    )
}
const Tabs = createBottomTabNavigator();
const TabsScreen = () => (
    <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: '#ffffff',
          inactiveTintColor: 'grey',
          activeBackgroundColor : '#EF800B'
        }}>
        <Tabs.Screen 
              name="books" 
              component={BooksStackScreen} 
              options={{
                tabBarLabel: 'Books',
                tabBarColor: '#EF800B',
                tabBarIcon: ({ color }) => (
                  <FontAwesome5 name="book" color={color} size={26} />
                ),  
              }}
          />
          <Tabs.Screen 
              name="Librairy" 
              component={HomeStackScreen}
              options={{
                tabBarLabel: 'Librairy',
                tabBarColor: '#EF800B',
                tabBarIcon: ({ color }) => (
                  <FontAwesome5 name="book-open" color={color} size={26} />
                ),  
              }}
        />
          <Tabs.Screen 
              name="Profile" 
              component={SettingsStackScreen} 
              options={{
                tabBarLabel: 'Profile',
                tabBarColor: '#EF800B',
                tabBarIcon: ({ color }) => (
                  <FontAwesome5 name="user-alt" color={color} size={26}/>
                ),  
              }}            
          />
    </Tabs.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Home" drawerContent= { props => <DrawerContent {...props}/>}>
    <Drawer.Screen name="Home" component={TabsScreen}/>
    <Drawer.Screen name="Roman" component={roman} />
    <Drawer.Screen name="SF, Fantasy" component={sf_Fantasy} />
    <Drawer.Screen name="Policier, Thrillers" component={policier_thriller} />
    <Drawer.Screen name="Manga" component={manga} />
  </Drawer.Navigator>
);

const DrawerLivreur = createDrawerNavigator();
const DrawerScreenLivreur = () => (
  <DrawerLivreur.Navigator initialRouteName="Home" drawerContent= { props => <DrawerContentLivreur {...props}/>}>
    <DrawerLivreur.Screen name="Home" component={LivreurStackScreen}/>
  </DrawerLivreur.Navigator>
);
const DrawerAdmin = createDrawerNavigator();
const DrawerScreenAdmin = () => (
  <DrawerAdmin.Navigator initialRouteName="Home" drawerContent= { props => <DrawerContentLivreur {...props}/>}>
    <DrawerAdmin.Screen name="Home" component={AdminStackScreen}/>
  </DrawerAdmin.Navigator>
);
const RootStack = createStackNavigator();
const RootStackScreen = ({token, idRole}) => (
  <RootStack.Navigator headerMode="none">
    {
      idRole == 2 ? (
        token ? (
          <RootStack.Screen
                options={{
                  animationEnabled: false
                }}        
                name="Management Time"
                component={DrawerScreen}
          />
        ) : (
          <RootStack.Screen
              name="Auth"
              component={AuthStackScreen}
              options={{
                animationEnabled: false
              }}
            />
        )
      ) : idRole == 4 ? (
            <RootStack.Screen
              options={{
                animationEnabled: false
              }}        
              name="Livreur"
              component={DrawerScreenLivreur}
            />
      ) : idRole == 1 ? (
            <RootStack.Screen
              options={{
                animationEnabled: false
              }}        
              name="Admin"
              component={DrawerScreenAdmin}
            />
        ) : (
          <RootStack.Screen
              name="Auth"
              component={AuthStackScreen}
              options={{
                animationEnabled: false
              }}
            />
        ) 
    }  
  </RootStack.Navigator>
);

class Navigation extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        statusToken : '',
        loading : false
      } 
      this._statusToken()
  }
  _statusToken () {
    getToken(this.props.token).then(data => {
      if(data[0] !== 200){
        this.props.RESET_ACTION()
      }
    })
  }

  render() {
    if(this.state.loading) {
      return (
        <View>
            <Text>Test</Text>
        </View>
      )
    }
        return (
        <UserInactivity
          timeForInactivity = {1800000}
          timeoutHandler = {BackgroundTimer}
          onAction = {isActive => { isActive == false ? this._statusToken() : null }}
        >
          <AuthContext.Provider>
            <NavigationContainer>
                <RootStackScreen token={this.props.token} idRole= {this.props.idRole}/>
            </NavigationContainer>
          </AuthContext.Provider>
        </UserInactivity>
        )
      
      }
}

const mapStateToProps = (state) => {
  // Redux Store --> Component
 return {
     token: state.tokenReducer.token,
     idRole : state.idRoleReducer.idRole
 }
}
export default connect(mapStateToProps, {loginToken, RESET_ACTION, loginId }) (Navigation)