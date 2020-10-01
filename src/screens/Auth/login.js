import React from 'react'
import { View , StyleSheet, ActivityIndicator, StatusBar, Text, TextInput, TouchableOpacity } from 'react-native'
import { Input, Button} from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { postUser } from '../../api/index'
import {loginToken} from '../../redux/actions/tokenAction'
import { loginId } from '../../redux/actions/idUserAction'
import {roleId} from '../../redux/actions/idRoleAction'
import { connect } from 'react-redux'
import { RESET_ACTION } from '../../redux/actions/resetActions'
import { Root, Popup } from 'popup-ui';
//UI
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.username = ""
        this.password = ""
        this.state = {
            textErro : "",
            loading : false
        }  
    }

    authInputLogin(text) {
        this.username = text
    }

    authInputPassword(text) {
        this.password = text
    }
    
    connexion(){
        postUser(this.username, this.password).then(data => {
            if(data[0] == 200) {      
                this.setState({
                    loading : true
                })     
                this.props.roleId(data[1].user.id_role) 
                this.props.loginId(data[1].user.id_user)
                this.props.loginToken(data[1].token)
                this.setState({
                    loading : false
                })
            }
            else {
                this.setState({
                    textErro : data[1].msg
                })
                Popup.show({
                    type: 'Danger',
                    title: 'Connexion',
                    textBody: this.state.textErro,
                    button: false,
                    buttonText: 'Ok',
                    callback: () => Popup.hide()
                })            
            }

        })
    }

    render() {
        if(this.state.loading) {
            return(
                <View style={{flex: 1,justifyContent: "center"}}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )
        }
        return (
            <Root>
            <View style={styles.container}>
            <StatusBar backgroundColor='#EF800B' barStyle="light-content"/>
                    <View style={styles.header}>
                        <Animatable.Text animation = "fadeInLeftBig" style={styles.text_header}>Deliveread</Animatable.Text>
                    </View>
                <Animatable.View style={styles.footer}
                    animation="fadeInUp">
                    <Text style={styles.text_footer}>Username</Text>
                        <View style={styles.action}>
                            <MaterialIcons 
                                name="person"
                                size={22}
                            />
                            <TextInput 
                                placeholder="Veuillez entrer votre email"
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                keyboardType = "email-address"
                                autoCapitalize="none"
                                onChangeText = {(text) => this.authInputLogin(text)}
                            />
                        </View>    
                    <Text style={styles.text_footer}>Mot de Passe</Text>
                        <View style={styles.action}> 
                            <MaterialIcons 
                                name="vpn-key"
                                size={22}
                            />
                            <TextInput 
                                placeholder="Veuillez entrer votre mot de passe"
                                placeholderTextColor="#666666"
                                secureTextEntry= {true}
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText = {(text) => this.authInputPassword(text)}
                            />
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                style={styles.signIn}
                                onPress={() => this.connexion()} 
                            >
                                <LinearGradient
                                    colors={['#EF800B', '#DE7C15']}
                                    style={styles.signIn}>
                                    <Text style={styles.textSign}>Connexion</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('Register')}
                            style = {{ width: '100%',alignItems : 'flex-end'}}>
                            <Text style={{color: '#05375a', marginTop:15, textAlign : 'right'}}>Créer un compte</Text>
                        </TouchableOpacity>
                        </View>
                </Animatable.View>
                </View>
            </Root>
        )
    }
}
const styles = StyleSheet.create({ 

    container: {
        flex: 1, 
        backgroundColor: '#EF800B'
      },
      header: {
          flex: 1,
          justifyContent: 'flex-end',
          paddingHorizontal: 20,
          paddingBottom: 50
      },
      footer: {
          flex: 2,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 30,
      },
      text_header: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 60
      },
      text_footer: {
          color: '#05375a',
          fontSize: 22, 
          marginTop : 10
      },
      action: {
          flexDirection: 'row',
          marginTop: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
          paddingBottom: 5
      },
      textInput: {
          flex: 1,
          marginTop: Platform.OS === 'ios' ? 0 : -12,
          paddingLeft: 10,
          color: '#05375a',
      },
      button: {
          alignItems: 'center',
          marginTop: 30
      },
      signIn: {
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10
      },
      textSign: {
          fontSize: 18,
          fontWeight: 'bold', 
          color : "white"
      }
    });

const mapStateToProps = (state) => {
    // Redux Store --> Component
   return {
       token: state.tokenReducer.token,
   }
}

export default connect(mapStateToProps, {loginToken, RESET_ACTION, loginId,roleId})(Login)