import React from 'react'
import { StyleSheet, View, ActivityIndicator, ScrollView , Text , Image,Linking} from 'react-native'
import { getCmdUserbooksIdCmd } from '../../api/index'
import moment from 'moment'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Button } from 'react-native-elements';
import { connect } from 'react-redux'
import MapView from 'react-native-maps';
import { color } from 'react-native-reanimated'
import {Root,Popup} from 'popup-ui'


class CommandeDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     Data : ''
    }
   //this.componentDidMount()
  }

componentWillMount() {
  console.log('didmount')
  getCmdUserbooksIdCmd(this.props.route.params.id_Commande).then(data => {
      this.setState({
        Data: data.book[0],
        isLoading: false
      })
    })
    //console.log(this.state)
}

// _displayLoading() {
//     if (this.state.isLoading) {
//       return (
//         <View style={styles.loading_container}>
//           <ActivityIndicator size='large' />
//         </View>
//       )
//     }
// }


// _displayBook() {
//   const { book } = this.state
//   if (this.state.book != undefined) {
//     return (
    //   <ScrollView style={styles.scrollview_container}>
    //       <Image
    //           style={styles.image}
    //           source={{uri: 'data:image/png;base64,' + book[0].image}}
    //       />
    //       <Text style={styles.title_text}>{book[0].titre}</Text>
    //       <Text style={styles.description_text}>{book[0].synopsys}</Text>
    //       <Text style={styles.default_text}>Auteur : {book[0].auteur}</Text>
    //       <Text style={styles.default_text}>Collection : {book[0].collection}</Text>
    //       <Text style={styles.default_text}>Sorti le {moment(new Date(book[0].dateSortie)).format('DD/MM/YYYY')}</Text>
    //       <Text style={styles.default_text}>Prix : {book[0].prix}</Text>
    //   </ScrollView>
  
//     )
//   }
// }
// _reservation = () => {
//   this.props.navigation.navigate('Adresse', { id_book : this.props.route.params.id_book})
// }

// _buttonReserve () {
//   const { book } = this.state
//   if (this.state.book != undefined) {
//     if(book[0].id_commandebooks == null)
//     {      
//       return ( 
//         <Button
//           title="Reserver"
//           onPress={() => {this._reservation()}}
//           icone = {
//             <Icon
//                 name="book-open"
//                 size={50}
//                 color="green"
//             />
//           }
//         />
//       )
//     }
//     else {
//       return null
//     }
//   }
// }

validatepopUp() {
  Popup.show({
    type: 'Warning',
    title:'',
    textBody : 'voulez-vous prendre cette commande ?',
    button: true,
    buttonText: 'oui',
   
    callback: () => Popup.hide()
  })
}
  render() {
     console.log(this.state.Data.ReferenceBook)
     const tel =Number.parseInt('0'+this.state.Data.telephone);
     console.log(this.state.Data.id_Commande)
    return (
      <Root>
      <View style={styles.main_container}>
          {/* { {this._displayLoading()}
          {this._displayBook()}
          {this._buttonReserve()} } */}
            <View><Text>{this.props.idUser} </Text></View>
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
                                {/* <Text style = {styles.numTel} onPress={()=>{Linking.openURL('tel:0'+`${this.state.Data.telephone}` )}}>Appeler</Text> */}

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
            <View style={{flex:1 , alignSelf: 'center' }} ><Text style={styles.client}>Référence: </Text><Text style={{alignSelf : 'center', color : '#F7571B'}}> {this.state.Data.ReferenceBook}</Text></View>
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
                <Button
          title="Je choisie cette commande"
          style={{alignSelf :'flex-end'}}
          onPress={()=>{this.validatepopUp()}}
         
            
            />    
      </View>
      </Root>
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
