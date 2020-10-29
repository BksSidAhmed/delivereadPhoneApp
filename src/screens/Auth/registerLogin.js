import React from 'react'
import { View , StyleSheet, ScrollView, Text, TouchableOpacity} from 'react-native'
import { Input, Button} from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { postUserRegister } from '../../api/index'
import { Root, Popup } from 'popup-ui';

class RegisterLogin extends React.Component {
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
    
    authInputLogin(text) {
        this.username = text
    }
    authInputPassword(text) {
        this.password = text
    }
    
    register(){
        console.log(this.props.route.params.email)
        console.log(this.props.route.params.prenom)
        console.log(this.props.route.params.nom)
        console.log(this.props.route.params.telephone)

        postUserRegister(this.props.route.params.prenom,this.props.route.params.nom,this.username,this.password,this.props.route.params.telephone,this.props.route.params.email).then(data => {
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
    GoRegister(){
        this.props.navigation.navigate('Register')
    }
    render() {
        return (
            <Root>
                <View style = {styles.main_containers}>
                    <View style={styles.header}>
                        <Text animation = "fadeInLeftBig" style={styles.text_header}>Sign UP : Information Authentification</Text>
                    </View>
                    <ScrollView style={styles.footer}>
                    <Input 
                        placeholder = 'Login'
                        onChangeText = {(text) => this.authInputLogin(text)}
                        leftIcon = {
                            <MaterialIcons
                                style = {styles.icon}
                                name = 'person'
                                size = {20}
                                color = 'black'
                            />
                        }
                        autoCapitalize="none"
                        inputStyle={{marginBottom:10, color : '#FF9800'}}
                        placeholderTextColor='black'
                    />
                    <Input
                        placeholder = 'Mot de passe'
                        onChangeText = {(text) => this.authInputPassword(text)}
                        leftIcon = {
                            <MaterialIcons
                                style = {styles.icon}
                                name = 'vpn-key'
                                size = {20}
                                color = 'black'
                            />
                        }
                        autoCapitalize="none"
                        inputStyle={{marginBottom:10, color : '#FF9800'}}
                        placeholderTextColor='black'   
                    />
                <View style = {{flexDirection : 'row'}}>
                    <TouchableOpacity 
                        style = {{alignItems : 'flex-start', margin : 10}}
                        onPress={() => this.GoRegister()} >
                            <FontAwesome5
                                style = {styles.icon}
                                name = 'arrow-circle-left'
                                size = {35}
                                color = 'black'
                            />
                    </TouchableOpacity>
                    <View style = {{marginLeft : 30}}>
                        <Button style={styles.style_button}
                            onPress={() => this.register()} 
                            type="clear"
                            title="S'enregistrer"
                            titleStyle={{color:'black', margin:10}}
                        /> 
                    </View>
                </View>
                </ScrollView>
            </View>
        </Root>
        )
    }
}
const styles = StyleSheet.create({ 

    main_containers: {
        flex : 1,
        backgroundColor: '#EF800B',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    header: {
        flex: 0.75,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
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

export default (RegisterLogin)
