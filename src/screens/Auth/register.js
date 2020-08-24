import React from 'react'
import { View , StyleSheet, Text, Linking } from 'react-native'
import { Input, Button} from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { postUserRegister } from '../../api/index'
import { Root, Popup, Toast } from 'popup-ui';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.prenom = ""
        this.nom = ""
        this.username = ""
        this.password = ""
        this.telephone = ""
        this.email = ""
        this.state = {
            textErro : ""
        }  
    }

    authInputPrenom(text) {
        this.prenom = text
    } 
    authInputNom(text) {
        this.nom = text
    }
    authInputLogin(text) {
        this.username = text
    }
    authInputPassword(text) {
        this.password = text
    }
    authInputTelephone(text) {
        this.telephone = text
    }
    authInputEmail(text) {
        this.email = text
    }
    
    register(){
        postUserRegister(this.prenom,this.nom,this.username,this.password,this.telephone,this.email).then(data => {
            console.log(this.props)
            if(data[0] == '201') {
                Popup.show({
                    type: 'Success',
                    title: 'Insciption',
                    textBody: 'Compte créé avec succès',
                    button: true,
                    buttonText: 'Ok',
                    callback: () => this.props.navigation.navigate('Login')
                })
            }
            else {
                this.setState({
                    textErro : data[1].msg
                })
                Popup.show({
                    type: 'Danger',
                    title: 'Insciption',
                    textBody: this.state.textErro,
                    button: true,
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
                <Input 
                        placeholder = 'Prenom'
                        onChangeText = {(text) => this.authInputPrenom(text)}
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
                        placeholder = 'Nom'
                        onChangeText = {(text) => this.authInputNom(text)}
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
                        placeholder = 'Login'
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
                    <Input 
                        placeholder = 'Telephone'
                        onChangeText = {(text) => this.authInputTelephone(text)}
                        leftIcon = {
                            <FontAwesome5
                                style = {styles.icon}
                                name = 'mobile-alt'
                                size = {20}
                                color = 'white'
                            />
                        }
                        inputStyle={{marginBottom:10, color : '#FF9800'}}
                        placeholderTextColor='white'
                    />
                    <Input 
                        placeholder = 'Email'
                        onChangeText = {(text) => this.authInputEmail(text)}
                        leftIcon = {
                            <FontAwesome5
                                style = {styles.icon}
                                name = 'envelope'
                                size = {20}
                                color = 'white'
                            />
                        }
                        inputStyle={{marginBottom:10, color : '#FF9800'}}
                        placeholderTextColor='white'
                    />
                    <Button style={styles.style_button}
                            onPress={() => this.register()} 
                            type="clear"
                            title="S'enregistrer"
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
      },
})
const mapStateToProps = (state) => {
    // Redux Store --> Component
   return {
   }
}

export default (Register)
