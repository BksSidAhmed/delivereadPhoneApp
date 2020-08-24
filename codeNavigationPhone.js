// Dependance React 
import * as React from 'react';
// Dependance React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
// Components
import Librairy from '../components/librairy';
import Profile from '../components/profile';
import Books from '../components/books';
import BooksDetail from '../components/booksDetail';
import Login from '../components/login';
import Register from '../components/register';
import Reservation from '../components/reservation';
import Adresse from '../components/adresse';
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
              backgroundColor: '#FF9800',
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
              backgroundColor: '#FF9800',
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
const LoginStack = createStackNavigator();
function LoginStackScreen() {
  return(
            <LoginStack.Navigator>
              <LoginStack.Screen 
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
              <LoginStack.Screen 
                  name="Navigation" 
                  component={Navigation}
                  options =  {{
                    title: 'Deliveread ',
                    headerTitleAlign: 'center',
                    headerStyle: {
                      backgroundColor: '#FF9800',
                    },
                    headerTintColor: '#fff',
                  }}
              />
        </LoginStack.Navigator> 
    )
}
const RegisterStack = createStackNavigator();
function RegisterStackScreen() {
  return(
            <RegisterStack.Navigator>
              <RegisterStack.Screen 
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
            </RegisterStack.Navigator> 
    )
}
const Tab = createBottomTabNavigator();
class Navigation extends React.Component {
      constructor(props) {
          super(props)
          this.state = {
            statusToken : '',
            interval: null,
          } 
    }

  _statusToken () {
    getToken(this.props.token).then(data => {
      this.setState({
          statusToken: data[0],
      })
      if(this.state.statusToken == 200){
        console.log(data[1].user.id_user)
        this.props.loginId(data[1].user.id_user)
      }
    })
  }

  UNSAFE_componentWillMount() {
      this.props.RESET_ACTION()    
      this._statusToken()
  }

  render() {
      if (this.state.statusToken == '200' ) {
        return (
          <NavigationContainer>
            <Tab.Navigator
                  tabBarOptions={{
                    activeTintColor: '#ffffff',
                    inactiveTintColor: 'grey',
                    activeBackgroundColor : '#FF9800'
                  }}>
            <Tab.Screen 
                  name="books" 
                  component={BooksStackScreen} 
                  options={{
                    tabBarLabel: 'Books',
                    tabBarColor: '#009387',
                    tabBarIcon: ({ color }) => (
                      <FontAwesome5 name="book" color={color} size={26} />
                    ),  
                  }}
              />
              <Tab.Screen 
                  name="Librairy" 
                  component={HomeStackScreen}
                  options={{
                    tabBarLabel: 'Librairy',
                    tabBarColor: '#009387',
                    tabBarIcon: ({ color }) => (
                      <FontAwesome5 name="book-open" color={color} size={26} />
                    ),  
                  }}
            />
              <Tab.Screen 
                  name="Profile" 
                  component={SettingsStackScreen} 
                  options={{
                    tabBarLabel: 'Profile',
                    tabBarColor: '#009387',
                    tabBarIcon: ({ color }) => (
                      <FontAwesome5 name="user-alt" color={color} size={26}/>
                    ),  
                  }}            
              />
            </Tab.Navigator>
          </NavigationContainer>
        );
      }
      else {
        return (
          <NavigationContainer>
          <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: '#ffffff',
                  inactiveTintColor: 'grey',
                  activeBackgroundColor : '#FF9800'
                }}>
          <Tab.Screen 
                name="Login" 
                component={LoginStackScreen} 
                options={{
                  tabBarLabel: 'Login',
                  tabBarColor: '#009387',
                  tabBarIcon: ({ color }) => (
                    <FontAwesome5 name="book" color={color} size={26} />
                  ),  
                }}
            />
            <Tab.Screen 
                name="Register" 
                component={RegisterStackScreen}
                options={{
                  tabBarLabel: 'Register',
                  tabBarColor: '#009387',
                  tabBarIcon: ({ color }) => (
                    <FontAwesome5 name="book-open" color={color} size={26} />
                  ),  
                }}
          />
          </Tab.Navigator>
        </NavigationContainer>          
        );
      
      }
  }
}
const mapStateToProps = (state) => {
  // Redux Store --> Component
 return {
     token: state.tokenReducer.token,
 }
}
export default connect(mapStateToProps, {loginToken, RESET_ACTION, loginId }) (Navigation)