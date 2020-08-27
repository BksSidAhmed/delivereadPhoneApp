import React  from 'react'
import { StyleSheet,View , Text, TextInput, ScrollView } from 'react-native'
//redux
import { connect } from 'react-redux'
import { getUserByIdUser , postNewDataUser} from '../api/index'
import PhoneInput from 'react-native-phone-input'
import { IconButton , Avatar } from 'react-native-paper';

class Profile extends React.Component {
    constructor(props) {
        super(props)
        //console.log('constructeur')
        //déclare les variables qui vont être stockées lors de la saisie
        this.email = '',
        this.prenom = '',
        this.nom ='',
        this.login ='',
        this.telephone = ''
        this.state = {
            dataUser : ''
        }
    }
    UNSAFE_componentWillMount(){
      
       getUserByIdUser(this.props.idUser).then(data => {
            console.log(data.user[0])
           this.setState({
               dataUser : data.user[0]
           })
        })
    }
    //déclarer les fonctions
    setEmail = (emailSaisie) => {
        this.email = emailSaisie
    }
    setPrenom = (prenomSaisie) => {
        this.prenom = prenomSaisie
    }
    setNom = (nomSaisie) => {
        this.nom = nomSaisie
    }
    setLogin = (loginSaisie) => {
        this.login = loginSaisie
    }
    setTelephone = (telephoneSaisie) => {
        this.telephone = telephoneSaisie
    }
    go = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.email) === true){
            console.log( 'valid');
            postNewDataUser('email',this.email,this.props.idUser).then(data => {
                console.log(data)
               
            })
        }
        else{
            console.log( ' pas valid');
        }
    }
    verifTelephone = () => {
        console.log(this.telephone)
        var valide=/^0[1-6]\d{8}$/;
        if(valide.test(this.telephone)){
            console.log('Bon numéro !');
            this.sendNewData('telephone',this.telephone)
        }
        else{
            console.log('Mauvais numéro !');
        }
	
    // On renvoie match
    console.log(valide)
    }
    sendNewData = (param, paramValeur) => {
        
        postNewDataUser(param,paramValeur,this.props.idUser).then(data => {
            console.log(data)
           
        })
    }
    render() {
        
        //console.log('render')
        //console.log(this.state.dataUser[0])
       
        return (
            <View style={styles.mainContent}>
              <View style={styles.headerContent}>
                <Avatar.Icon 
                    size={64} 
                    icon="folder"
                    style={{backgroundColor : 'white' }}
                />
              </View>
              <ScrollView style={styles.bodyContent}>
              <Text style={{ color: 'black' , fontWeight: 'bold'}}>Modifier mes informations</Text>
                  {/* pour prenom */}
                  {/* a mettre des view pour le design entre chaque textinput et button */}
               <View style={styles.form}>
               <Text style={{ color: 'black' }}>Prenom</Text>
                <TextInput 
                        placeholder={this.state.dataUser.prenom}
                        placeholderTextColor="#666666"
                        keyboardType = "email-address"
                        onChangeText = {(prenomSaisie) => this.setPrenom(prenomSaisie)}
                        editable = {true} 
                        style={{borderColor : 'black',flex:1}}
                    />
                    <IconButton
                        onPress={() => this.sendNewData('prenom',this.prenom)}
                        icon = "pencil"
                        color="#841584"
                        size= {20}
                        style={{alignItems : 'flex-end',flex:1}}
                    />
                </View>
                 {/* Nom */}
                 <View style={styles.form}>
                    <Text style={{ color: 'black' }}>Nom</Text>
                        <TextInput 
                            placeholder={this.state.dataUser.nom}
                            placeholderTextColor="#666666"
                            keyboardType = "email-address"
                            onChangeText = {(nomSaisie) => this.setNom(nomSaisie)} 
                            style={{borderColor : 'black',flex:1}}                 
                        />
                        <IconButton
                        onPress={() => this.sendNewData('nom',this.nom)}
                        icon = "pencil"
                        color="#841584"
                        size= {20}
                        style={{alignItems : 'flex-end',flex:1}}
                        /> 
                 </View>
                {/* login */}
                <View style={styles.form}>
                <Text style={{ color: 'black' }}>Login</Text>
                 <TextInput 
                    placeholder={this.state.dataUser.login}
                    placeholderTextColor="#666666"
                    keyboardType = "email-address"
                    onChangeText = {(loginSaisie) => this.setLogin(loginSaisie)}
                    style={{borderColor : 'black',flex:1}}                      
                />
                <IconButton
                   onPress={() => this.sendNewData('login',this.login)}
                   icon = "pencil"
                   color="#841584"
                   size= {20}
                   style={{alignItems : 'flex-end',flex:1}}
                /> 
                </View>
                {/* telephone */}
                <View style={styles.form}>
                <Text style={{ color: 'black' }}>Numéro de téléphone</Text>
                 <PhoneInput 
                    ref='phone'
                    initialCountry = 'fr'
                    textProps= {{
                        placeholder : '0'+this.state.dataUser.telephone 
                    }}   
                    onChangePhoneNumber={(telephoneSaisie) => this.setTelephone(telephoneSaisie)}
                    flagStyle = {{
                        display : "none"
                    }}
                    style={{borderColor : 'black',flex:1}}          
                 />
                <IconButton
                  onPress={() => this.verifTelephone()}
                  icon = "pencil"
                  color="#841584"
                  size= {20}
                  style={{alignItems : 'flex-end',flex:1}}
                />  
                </View>
                  {/* pour email */}
                  <View style={styles.form}>
                  <Text style={{ color: 'black' }}>Email</Text>
                 <TextInput 
                    placeholder={this.state.dataUser.email}
                    placeholderTextColor="#666666"
                    keyboardType = "email-address"
                    onChangeText = {(emailSaisie) => this.setEmail(emailSaisie)}
                    style={{borderColor : 'black',flex:1}}                   
                />
                <IconButton
                   onPress={() => this.go()}
                    icon = "pencil"
                  color="#841584"
                  size= {20}
                  style={{alignItems : 'flex-end',flex:1}}
                /> 
                 </View>
              </ScrollView>    
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainContent: {
        flex : 3
    },
    headerContent : {
      
        backgroundColor : '#EF800B',
        height : 100,
        alignItems:'center',
        paddingTop :15
    },
    bodyContent: {
        flex: 2,
        backgroundColor: 'white'
    },
    form: {
        flex : 2,
        flexDirection : 'row',
        marginTop: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#f2f2f2',
    }
    
  });
 
  const mapStateToProps = (state) => {
    // Redux Store --> Component
   return {
       idUser: state.idUserReducer.idUser,
   }
}
export default connect(mapStateToProps)( Profile)