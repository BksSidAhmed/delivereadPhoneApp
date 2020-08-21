import React from 'react'
import { View , StyleSheet, DevSettings, Image } from 'react-native'
import { Input, Button} from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { postUser } from '../api/index'
import {loginToken} from '../redux/actions/tokenAction'
import { connect } from 'react-redux'
import { RESET_ACTION } from '../redux/actions/resetActions'
import { Root, Popup } from 'popup-ui';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.username = ""
        this.password = ""
        this.state = {
            textErro : ""
        }  
    }

    authInputLogin(text) {
        this.username = text
    }

    authInputPassword(text) {
        this.password = text
    }
    connexion(){
        postUser(this.username,this.password).then(data => {
            if(data[0] == 200) {
                this.props.loginToken(data[1].token)
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
        return (
            <Root>
            <View style = {styles.main_containers}>
                <Image
                    source={require('../../img/logo.png')}>
                </Image>
                    <Input 
                        placeholder = 'Username'
                        onChangeText = {(text) => this.authInputLogin(text)}
                        leftIcon = {
                            <MaterialIcons
                                style = {styles.icon}
                                name = 'person'
                                size = {20}
                                color = 'white'
                            />
                        }
                        inputStyle={{marginBottom:10, color : '#FF9800'}}
                        placeholderTextColor='white'
                    />
                    <Input 
                        placeholder = 'Mot de passe'
                        onChangeText = {(text) => this.authInputPassword(text)}
                        leftIcon = {
                            <MaterialIcons
                                style = {styles.icon}
                                name = 'vpn-key'
                                size = {20}
                                color = 'white'
                            />
                        }
                        inputStyle={{marginBottom:10, color : '#FF9800'}}
                        placeholderTextColor='white'
                        
                    />
                    <Button style={styles.style_button}
                            onPress={() => this.connexion()} 
                            type="clear"
                            loading={this.state.loading}
                            title="Connexion"
                            titleStyle={{color:'white', margin:10}}
                    /> 
            </View>
            </Root>
        )
    }
}
const styles = StyleSheet.create({ 

    main_containers: {
        flex : 1,
        backgroundColor: '#183B5A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    containers_button : {
        marginTop : 10,
    },
    icon : {
        marginRight : 10,
        marginBottom:10
    },
    TextStyle: {
        color: '#E91E63',
      }
})

const mapStateToProps = (state) => {
    // Redux Store --> Component
   return {
       token: state.tokenReducer.token,
   }
}

export default connect(mapStateToProps, {loginToken, RESET_ACTION})(Login)