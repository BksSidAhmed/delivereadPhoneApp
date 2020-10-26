import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import moment from 'moment'
import {getCommandeIdUser } from '../api/index'
import { connect } from 'react-redux'
import {Button} from 'react-native-elements'
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
      onPress = () => {
        this.setState((prevState, prevProps) => ({
          isSelected: !prevState.isSelected
        }))
      }    
      UNSAFE_componentWillMount() {
        getCommandeIdUser(this.props.book.ReferenceBook, this.props.idUser).then(data => {
          console.log(data)
          this.setState({
            CommandeUser: data.commande[0].etat,
          })
        })
      }
      componentDidMount() {
          this.myInterval = setInterval(() => {
            getCommandeIdUser(this.props.book.ReferenceBook, this.props.idUser).then(data => {
              this.setState({
                CommandeUser: data.commande[0].etat,
              })
            })
          }, 60000)
      }

      componentWillUnmount() {
          clearInterval(this.myInterval)
      }
      
      renderDetails = () => {
        const book = this.props.book
        const { displayDetailForBook } = this.props
        return(
          <View style = {{alignItems: 'center', marginBottom: 10}}> 
              <Text style = {{textAlign : "center"}}>{this.state.CommandeUser}</Text> 
              {
                this.state.CommandeUser == "Commande en cours de Traitement" ? (
                  <Progress.Bar progress={0.35} width={350} height={10}/>
                ):(
                  this.state.CommandeUser == "Commande remis au livreur" ? (
                  <Progress.Bar progress={0.70} width={350} height={10}/>
                  ):(
                    this.state.CommandeUser == "phase de retour" ? (
                      <View >
                         <Progress.Bar style = {{marginBottom : 5}} progress={1} width={350} height={10} color="green"/>
                          
                          <Button
                            onPress={() => displayDetailForBook(book.id_book)}
                            title="Voir les relais"
                            type="solid"
                          />
                      </View>
                    ):(
                      <Progress.Bar progress={0} width={350} height={10}/>
                    )
                  )  
                )
              }
          </View>
        )
      }

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
      backgroundColor: 'gray'
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
    books1 : state.booksReducer.books1,
    idUser: state.idUserReducer.idUser,
}
}

export default connect(mapStateToProps)(LibrairyItem)