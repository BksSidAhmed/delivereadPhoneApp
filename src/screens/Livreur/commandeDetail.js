import React from 'react'
import { StyleSheet, View, ActivityIndicator, ScrollView , Text , Image,Linking , Alert} from 'react-native'
import { getCmdUserbooksIdCmd , postCmdIdLivreur, postCmdIdLivreurClient } from '../../api/index'
import moment from 'moment'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'

class CommandeDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     Data : ''
    }
  }

componentWillMount() {
  getCmdUserbooksIdCmd(this.props.route.params.id_Commande).then(data => {
      this.setState({
        Data: data.book[0],
        isLoading: false
      })
    })
}

render() {
     const tel =Number.parseInt('0'+this.state.Data.telephone);
     const twoOptionAlertHandler = () => {
      Alert.alert('Warning','Voulez-vous prendre cette commande ?',
        [
          { text: 'oui', onPress: () => postCmdIdLivreur(this.props.idUser,this.state.Data.id_Commande).then(data => {}) },
          {text: 'Non',onPress: () => console.log('No Pressed'),style: 'cancel'},
        ],
        { cancelable: false }
      );
    };
    const twoOptionAlertHandlerRemis = () => {
      Alert.alert('Warning','Commande livré ?',
        [
          { text: 'oui', onPress: () => postCmdIdLivreurClient(this.props.idUser,this.state.Data.id_Commande).then(data => {}) },
          {text: 'Non',onPress: () => console.log('No Pressed'),style: 'cancel'},
        ],
        { cancelable: false }
      );
    };

    return (
      <View style={styles.main_container}>
        <View style={styles.divClient}>  
          <Text style={styles.client}>Client: </Text>
          <Text style={styles.nom}>{this.state.Data.nom} {this.state.Data.prenom}</Text>
        </View>
        <View style={styles.divTel}>
          <View style={styles.divIcon}> 
            <FontAwesome5 
              style = {styles.icon}
              name="phone"
              color ='green'
              size={22}
              onPress ={()=>{Linking.openURL('tel:0'+`${this.state.Data.telephone}` )}}
            />
          </View>
        </View>   
        <View style={styles.divCom}>
          <View style={styles.divCmd}>
            <FontAwesome5 
              style = {{margin : 10 }}
              name="book-open"
              color ='#F6416D'
              size={22}
              onPress ={()=>{Linking.openURL('tel:0'+`${this.state.Data.telephone}` )}}
            />
          <Text style={{ color : '#EC5423',textAlign : 'center' , flex: 1, fontSize :20}}> {this.state.Data.titre}</Text>
        </View>
        <View style={styles.divCmd}>
          <Image
            style={styles.image}
            source={{uri: 'data:image/png;base64,' + this.state.Data.image}}
          />
          <View style={{flex:1 , alignSelf: 'center' }}> 
            <Text style={styles.client}>Référence: </Text>
            <Text style={{alignSelf : 'center', color : '#F7571B'}}> {this.state.Data.ReferenceBook}</Text>
          </View>
        </View>   
      </View>
            
            <View style={styles.divCmd}>
            
            <FontAwesome5 
               style = {{margin : 10 }}
                name="map-marker-alt"
                color ='#EC2323'
                size={45}
                onPress ={()=>{Linking.openURL('tel:0'+`${this.state.Data.telephone}` )}}
                />
                <Text style={{flexWrap: 'wrap',fontSize: 16,textAlign : 'center'}}>{this.state.Data.adresse} </Text>
                </View>
                {
                  this.state.Data.etat == "Commande en cours de Traitement" ? (
                      <Button
                        title="Prendre la commande"
                        style={{alignSelf :'flex-end'}}
                        onPress={twoOptionAlertHandler}
                    /> 
                  ) : (
                    <Button
                      title="Commande remis au Client"
                      style={{alignSelf :'flex-end'}}
                      onPress={twoOptionAlertHandlerRemis}
                  /> 
                  )
                }
   
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1,
    marginBottom: 5,
  },
  image: {
    width: 100,
        height: 150,
        margin: 5,
    backgroundColor: 'gray',
    alignSelf :'flex-end'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  nom : {
    fontStyle: 'italic',
    fontWeight: 'bold',
    //textAlign : 'center',
    fontSize: 25,
    marginLeft : 10,
    marginBottom : 10,
    color : '#F7571B'
 
  },
  divTel : {
 
    flexDirection : 'row',
  
    alignContent : 'center',
    
  },
  divIcon : {
    flex : 1,
    textAlign: 'center',
    // backgroundColor : 'green',
    alignItems : 'center',
    marginBottom : 10
  
  },
  numTel : {
    // textAlign : 'center',
    // alignContent : 'center',
    margin : 5,
    
  },
  divClient : {
    flexDirection : 'row',
    alignSelf: 'center'
    

  },
  client : {
    margin : 5,
    fontSize: 15,
    //marginTop : 15,
    fontWeight: 'bold',
    textShadowColor: 20,
    color : 'black'
    
    
    
  },
  divCom : {
   
borderColor : '#F7571B',
height : 225 , 
borderWidth: 4,

margin : 35

  },
  divCmd : {
    flexDirection : 'row',
    alignItems : 'flex-start'
  }
  
})
const mapStateToProps = (state) => {
    // Redux Store --> Component
   return {
       idUser: state.idUserReducer.idUser,
   }
}
export default connect(mapStateToProps) (CommandeDetail)
