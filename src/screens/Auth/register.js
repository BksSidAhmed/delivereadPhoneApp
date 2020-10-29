import React from 'react'
import { View , StyleSheet, ScrollView, Text, TouchableOpacity} from 'react-native'
import { Input, Button} from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { postUserRegister } from '../../api/index'
import { Root, Popup } from 'popup-ui';

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.prenom = ""
        this.nom = ""
        this.telephone = ""
        this.email = ""

    }
    
    authInputPrenom(text) {
        this.prenom = text
    } 
    authInputNom(text) {
        this.nom = text
    }
    authInputTelephone(text) {
        this.telephone = text
    }
    authInputEmail(text) {
        this.email = text
    }
    GoRegisterLogin(){
        if(this.email == "" || this.nom == "" || this.telephone == "" || this.prenom == "") {
            Popup.show({
                type: 'Danger',
                title: 'Insciption',
                textBody: 'Veuillez remplir tout les champs',
                button: true,
                buttonText: 'Ok',
                callback: () => Popup.hide()
            })
           
        }
        else{
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(this.email) === true){
                this.props.navigation.navigate('RegisterLogin', { prenom : this.prenom, nom : this.nom, telephone : this.telephone, email : this.email})
            }
            else{
                Popup.show({
                    type: 'Danger',
                    title: 'Email',
                    textBody: 'Veuillez entrer un mail valid',
                    button: true,
                    buttonText: 'Ok',
                    callback: () => Popup.hide()
                })
            }
        }
    }
    render() {
        return (
            <Root>
                <View style = {styles.main_containers}>
                    <View style={styles.header}>
                        <Text animation = "fadeInLeftBig" style={styles.text_header}>Sign UP : Information Personnelle</Text>
                    </View>
                    <ScrollView style={styles.footer}>
                        <Input 
                            placeholder = 'Prenom'
                            onChangeText = {(text) => this.authInputPrenom(text)}
                            leftIcon = {
                                <MaterialIcons
                                    style = {styles.icon}
                                    name = 'person'
                                    size = {20}
                                    color = 'black'
                                />
                            }
                            inputStyle={{marginBottom:10, color : '#FF9800'}}
                            placeholderTextColor='black'
                        />
                        <Input 
                            placeholder = 'Nom'
                            onChangeText = {(text) => this.authInputNom(text)}
                            leftIcon = {
                                <MaterialIcons
                                    style = {styles.icon}
                                    name = 'person'
                                    size = {20}
                                    color = 'black'
                                />
                            }
                            inputStyle={{marginBottom:10, color : '#FF9800'}}
                            placeholderTextColor='black'
                        />
                        <Input 
                            placeholder = 'Telephone'
                            onChangeText = {(text) => this.authInputTelephone(text)}
                            leftIcon = {
                                <FontAwesome5
                                    style = {styles.icon}
                                    name = 'mobile-alt'
                                    size = {20}
                                    color = 'black'
                                />
                            }
                            inputStyle={{marginBottom:10, color : '#FF9800'}}
                            placeholderTextColor='black'
                        />
                        <Input 
                            placeholder = 'Email'
                            onChangeText = {(text) => this.authInputEmail(text)}
                            keyboardType = "email-address"
                            autoCapitalize="none"
                            leftIcon = {
                                <FontAwesome5
                                    style = {styles.icon}
                                    name = 'envelope'
                                    size = {20}
                                    color = 'black'
                                />
                            }
                            inputStyle={{marginBottom:10, color : '#FF9800'}}
                            placeholderTextColor='black'
                        />
                        <TouchableOpacity 
                        style = {{flex : 1, alignItems : 'flex-end', margin : 10}}
                        onPress={() => this.GoRegisterLogin()} >
                            <FontAwesome5
                                style = {styles.icon}
                                name = 'arrow-circle-right'
                                size = {50}
                                color = 'black'
                            />
                        </TouchableOpacity>
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
        flex: 0.5,
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

export default (Register)
