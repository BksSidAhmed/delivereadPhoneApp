import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import moment from 'moment'
import { getToken , getCommandeIdUser } from '../api/index'
import { connect } from 'react-redux'
import {Card} from 'react-native-elements'
import * as Progress from 'react-native-progress';

class LibrairyItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            CommandeUser: [],
            user_id : '',
            isSelected: false,
        }
    }
    UNSAFE_componentWillMount() {
        // getToken(this.props.token).then(data => {
        //   this.setState({
        //     user_id: data[1].user.id_user,
        //   })
        //   getCommandeIdUser(this.state.user_id).then(data => {
        //       this.setState({
        //         CommandeUser: data.commande[0].etat,
        //       })
        //   })
        // })
      }
      onPress = () => {
        this.setState((prevState, prevProps) => ({
          isSelected: !prevState.isSelected
        }))
      }
      renderDetails = () => {
        getCommandeIdUser(this.props.book.ReferenceBook).then(data => {
            this.setState({
              CommandeUser: data.commande[0].etat,
            })
        })
        return(
          <View style = {{backgroundColor : "#D5F5E3"}}> 
              <Text style = {{textAlign : "center"}}>Phase : {this.state.CommandeUser}</Text> 
              <Progress.Bar progress={0.5} width={200} /> 
              {/* <Progress.CircleSnail color={['red', 'green', 'blue']} /> */}
 
              {/* <Card containerStyle={styles.containers_accordeon} >
                  <Text style={{textAlign:'center',fontSize:15, color:'black', padding:10}}>
                    Entrez vos identifiants Portail e-RH puis cliquez sur le bouton "Connexion" pour vous identifier
                  </Text>
            </Card>   */}
            {/* <Progress.Circle size={30} indeterminate={true} /> */}
          </View>

         
        )
      }

    // _bareprogress(){
    //   console.log()
    //   if (this.state.CommandeUser == 'Traitement')
    //   {
    //   return(        
    //     <View style = {styles.bar_porgress}>
    //       <View style = {styles.traitement}><Text style = {styles.texttraitement}>En traitement</Text></View>
    //       <View style = {styles.gris}></View>
    //       <View style = {styles.gris}></View>
    //    </View>
    //   )
    //   }
    //   else if (this.state.CommandeUser == 'Envoi')
    //   {
    //   return(        
    //     <View style = {styles.bar_porgress}>
    //       <View style = {styles.envoi}><Text style = {styles.texttraitement}></Text></View>
    //       <View style = {styles.envoi}><Text style = {styles.texttraitement}>En livraison</Text></View>
    //       <View style = {styles.gris}></View>
    //    </View>)        
    //   }
    //   else (this.state.CommandeUser == 'Reception')
    //   {
    //   return(        
    //   <View style = {styles.bar_porgress}>
    //     <View style = {styles.reception}><Text style = {styles.texttraitement}></Text></View>
    //     <View style = {styles.reception}><Text style = {styles.texttraitement}>Livré</Text></View>
    //     <View style = {styles.reception}><Text style = {styles.texttraitement}></Text></View>
    //   </View>)
    //   }
    // }

    render() {
      const book = this.props.book
      const { displayDetailForFilm } = this.props
      const { isSelected } = this.state
      return (
      <View style={styles.main_containerView}>
        <TouchableOpacity 
            style={styles.main_container}  
            onPress={() => this.onPress()}>
          <Image
            style={styles.image}
            source={{uri:'data:image/png;base64,'+ book.image}}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={styles.title_text} numberOfLines={2}>{book.titre}</Text>
            </View>
            <View style={styles.description_container}>
              <Text style={styles.description_text} numberOfLines={6}>{book.synopsys}</Text>
            </View>         
          </View>
        </TouchableOpacity>
        {isSelected && this.renderDetails()}
      </View>  
      )
    }
  }
    
  const styles = StyleSheet.create({
    main_containerView: {
    },
    main_container: {
      height: 190,
      flexDirection: 'row',
    },
    containers_accordeon : {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom : 20
    },
    image: {
      width: 120,
      height: 180,
      margin: 5,
      //backgroundColor: 'gray'
    },
    content_container: {
      flex: 1,
      margin: 5
    },
    header_container: {
      flex: 3,
      flexDirection: 'row'
    },
    title_text: {
      fontWeight: 'bold',
      fontSize: 20,
      flex: 1,
      flexWrap: 'wrap',
      paddingRight: 5
    },
    description_container: {
      flex: 7
    },
    description_text: {
      fontStyle: 'italic',
      color: '#666666'
    },
    date_container: {
      flex: 1
    },
    date_text: {
      textAlign: 'right',
      fontSize: 14
    },
    bar_porgress : {
      margin: 5,
      flexDirection: 'row'
    },
    traitement : {
      width: 20,
      height: 20,
      borderTopLeftRadius : 15,
      flex : 3,
      backgroundColor: 'green',
      textAlign : 'center'
    },
    envoi : {
      width: 20,
      height: 20,
      flex : 3,
      backgroundColor: 'green',
      textAlign : 'center'
    },
    reception : {
      width: 20,
      height: 20,
      flex : 3,
      backgroundColor: 'green',
      textAlign : 'center'
    },
    gris : {
      width: 20,
      height: 20,
      flex : 3,
      backgroundColor: 'grey',
      textAlign : 'center',
    },
    texttraitement : {
      textAlign : 'center'
    }
})
const mapStateToProps = (state) => {
// Redux Store --> Component
return {
    token: state.tokenReducer.token,
}
}

export default connect(mapStateToProps)(LibrairyItem)