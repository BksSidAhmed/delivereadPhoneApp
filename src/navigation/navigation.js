// Dependance React 
import * as React from 'react';
// Dependance React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
// Components
import Librairy from '../components/librairy';
import Profile from '../screens/profile';
import Books from '../screens/books';
import BooksDetail from '../components/booksDetail';
import Login from '../screens/Auth/login';
import Register from '../screens/Auth/register';
import Reservation from '../screens/reservation';
import Adresse from '../screens/adresse';
//import Navigation from '../navigation/navigation'
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
              backgroundColor: '#FF9800',
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
              backgroundColor: '#FF9800',
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
              backgroundColor: '#FF9800',
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
              backgroundColor: '#FF9800',
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
                      backgroundColor: '#FF9800',
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
                      backgroundColor: '#FF9800',
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

const RootStack = createStackNavigator();
const RootStackScreen = ({token}) => (
  <RootStack.Navigator headerMode="none">
    {token ? (
      <RootStack.Screen
        name="Management Time"
        component={TabsScreen}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);

class Navigation extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        statusToken : '',
      } 
      // console.log('nav')
  }
  _statusToken () {
    getToken(this.props.token).then(data => {
      if(data[0] !== 200){
        this.props.RESET_ACTION()
      }
    })
  }


  render() {
        return (
        <UserInactivity
          timeForInactivity = {1800000}
          timeoutHandler = {BackgroundTimer}
          onAction = {isActive => { isActive == false ? this._statusToken() : null }}
        >
          <AuthContext.Provider>
            <NavigationContainer>
                <RootStackScreen token={this.props.token}/>
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
 }
}
export default connect(mapStateToProps, {loginToken, RESET_ACTION, loginId }) (Navigation)