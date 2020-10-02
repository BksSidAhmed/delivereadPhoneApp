import React from 'react'
import { StyleSheet, View, ActivityIndicator, ScrollView , Text , Image, TouchableOpacity, TextInput} from 'react-native'
import { getBooksid, postStar, getStar, getStatStar, getStatStarUser, getCommentaireAll, getIdAbonnement } from '../../api/index'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux'
import {Card} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import CommenteCountent from '../../components/commenteCountent'
import {Overlay} from 'react-native-elements'
import { Root, Popup} from 'popup-ui';
import { getSubscription } from '../../api/api_Payment'

class BooksDetail extends React.Component {
  constructor(props) {
    super(props)
    this.avis = null,
    this.state = {
      book: undefined,
      isLoading: true,
      starCount: '',
      starCountSend : null,
      starDisabled : false,
      nombreVotant : '', 
      commente : '',
      isSelected: false,
      iconCommentaire : 'arrow-circle-down', 
      isVisible : false, 
      noteCancel : false, 
      status : '', 
      idAbonnement : ''
    }
  }

  onPress = () => {
    this.setState((prevState, prevProps) => ({
      isSelected: !prevState.isSelected
    }))
    if (this.state.isSelected == false) {
      this.setState({
        iconCommentaire : 'arrow-circle-up'
      })
    }
    else {
      this.setState({
        iconCommentaire : 'arrow-circle-down'
      })
    }
  }    

  componentWillMount() {
    getIdAbonnement(this.props.idUser).then(data => {
      this.setState({
        idAbonnement : data.user[0].id_abonnement
      })
  })

  getStar(this.props.idUser,this.props.route.params.id_book).then(data => {
    if(data[1].commentaire[0] !== undefined) {
      this.setState({
        noteCancel : true
      })
    }
  })
  getStatStar(this.props.route.params.id_book).then(data => {
    if(data[1].note[0].note == null) {
          this.setState({
            starCount : 0
          })
        }
        else {
          this.setState({
            starCount : data[1].note[0].note,
          })
        }
  })
  getStatStarUser(this.props.route.params.id_book).then(data => {
    if(data[1].note[0].nombreVotant == 0) {
          this.setState({
            nombreVotant : 0
          })
        }
        else {
          this.setState({
            nombreVotant : data[1].note[0].nombreVotant,
          })
        }
  })
  getCommentaireAll(this.props.route.params.id_book).then(data => {
    this.setState({
      commente : data[1].commentaire,
    })
  })

}
componentDidMount() {
    getBooksid(this.props.route.params.id_book).then(data => {
      this.setState({
        book: data.book,
        isLoading: false
      })
    })
}


_displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
}

sendCommente() {
  this.setState({
    isVisible : true
  })
}
_displayBook() {
  const { book } = this.state
  const { isSelected } = this.state
  if (this.state.book != undefined) {
    return (
      <ScrollView style={styles.scrollview_container}>
          <Image
              style={styles.image}
              source={{uri: 'data:image/png;base64,' + book[0].image}}
          />
          <Card style = {{height : 80, borderWidth : 1, marginBottom : 5, marginLeft: 5, marginRight: 5, justifyContent : "center", flexDirection: 'row'}}>
            <View style = {{flex : 1,flexDirection : 'row', justifyContent : 'center', alignItems: 'center'}}>
              {this._buttonReserve()}
              {this._buttonNoter()}
            <View style = {{flex : 1, justifyContent : 'center', alignItems : "center"}}>
                <TouchableOpacity 
                    disabled = {true}
                    style = {{height : 50, width : 50, borderRadius : 100, backgroundColor : '#D1360C',alignItems : 'center', justifyContent: 'center' }}>
                    <FontAwesome5 name="shopping-cart" color="white" size= {20}></FontAwesome5>
                </TouchableOpacity>
                <Text>Achat</Text>
            </View>
        </View>
          </Card>
          <Text style={styles.title_text}>{book[0].titre}</Text>
          <View style = {styles.etoiles_content}>
              <StarRating
                disabled={true}
                fullStarColor = {'#E1D706'}
                maxStars={5}
                rating={this.state.starCount}
              />
            <Text style= {{textAlign : 'center'}}>{this.state.nombreVotant} vote(s)</Text>
          </View>
          <View style = {{marginLeft : 10, marginTop : 15}}>
            <Text style = {styles.title_content}>Synopsys :</Text>
          </View>
          <Card style = {{borderWidth : 1, margin : 5}}>
            <Text style={styles.description_text}>{book[0].synopsys}</Text>
          </Card>
          <View style = {{marginLeft : 10, marginTop : 15}}>
            <Text style = {styles.title_content}>Infomartion :</Text>
          </View>
          <Card style = {{borderWidth : 1, margin : 5}}>
            <Text style={styles.default_text}>Auteur : {book[0].auteur}</Text>
            <Text style={styles.default_text}>Collection : {book[0].collection}</Text>
            <Text style={styles.default_text}>Sorti le : {moment(new Date(book[0].dateSortie)).format('DD/MM/YYYY')}</Text>
            <Text style={styles.default_text}>Prix : {book[0].prix}</Text>
          </Card>
          <TouchableOpacity 
            onPress={() => {this.onPress()}}
            style = {{height: 50, borderTopWidth: 1,borderBottomWidth:1, borderColor: '#E2DFDE', backgroundColor: 'white', flexDirection : 'row' }}>
              <View style = {{justifyContent: 'center', alignItems : 'center', marginRight: 10, marginLeft: 10}}>
                <FontAwesome5 name="comments" color="#EF800B" size= {25}></FontAwesome5>
              </View>
              <View style = {{justifyContent: 'center', alignItems : 'center'}}>
                <Text style = {{textTransform : 'uppercase', fontWeight: 'bold'}}>Lire les commentaires</Text>
              </View>
              <View style = {{flex : 1,justifyContent: 'center', alignItems : 'flex-end'}}>
                <View style = {{ backgroundColor : '#18C12F', borderRadius : 10, height : 25, width: 25, alignItems : 'center', justifyContent: 'center'}}>
                  <Text style = {{textTransform : 'uppercase', fontWeight: 'bold'}}>{this.state.nombreVotant}</Text>
                </View>
              </View>
              <View style = {{justifyContent: 'center', alignItems : 'flex-end', marginRight: 10, marginLeft: 10, marginRight : 10}}>
                <FontAwesome5 name={this.state.iconCommentaire} color="#EF800B" size= {25}></FontAwesome5>
              </View>
          </TouchableOpacity>
          {isSelected && this._commentaire()}
          {this.Overlay()}
      </ScrollView>
    )
  }
}
onStarRatingPress(rating) {
  this.setState({
    starCountSend: rating,
  });
}

_setAvis = (avisSaisi) => {
  this.avis = avisSaisi
}

Overlay() {
  return (
      <Overlay 
          isVisible={this.state.isVisible} 
          onBackdropPress={() => this.setState({ isVisible: false })}
          overlayStyle = {{height : 350, width: 300}}>
            <View>
            <View style = {{marginBottom : 15}}>
              <StarRating
                  disabled = {this.state.starDisabled}
                  fullStarColor = {'#E1D706'}
                  maxStars={5}
                  rating={this.state.starCountSend}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
            </View>
            <TextInput
                style={{
                  marginBottom : 15,
                  fontSize : 20,
                  maxHeight : 200,
                  backgroundColor: 'white',
                  borderColor: '#000000',
                  borderWidth: 1,
                  textAlignVertical : 'top'
                }}
                onChangeText = {(avisSaisi) => this._setAvis(avisSaisi)}
                placeholder = {'Laisser un avis'}
                multiline={true}
                numberOfLines={7}>
                </TextInput>
               <View style = {{flexDirection: 'row', alignItems : 'flex-end'}}>
                <TouchableOpacity 
                  onPress ={() => this.setState({ isVisible: false })}
                  style = {{flex: 1, alignItems : 'flex-end', marginRight : 20}}>
                  <Text style= {{fontSize : 20, color : '#EF800B'}}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress ={() => this._validateAvis()}>
                  <Text style= {{fontSize : 20, color : 'green'}}>Valider</Text>
                </TouchableOpacity>
              </View>
            </View>
      </Overlay>
  )
}
_validateAvis() {
  if(this.avis == null || this.state.starCountSend == null) {
    this.setState({ isVisible: false, starCountSend : null })
    this.avis = null
      Popup.show({
        type: 'Danger',
        title: 'Commentaire',
        textBody: 'Merci de renseigner tout les champs si vous souhaiter laisser un commentaire ',
        button: true,
        buttonText: 'Ok',
        callback: () => Popup.hide()
      })    
  }
  else{
    postStar(this.avis,this.state.starCountSend, this.props.idUser,this.props.route.params.id_book).then(data => {
      this.setState({ isVisible: false, starCountSend : null })
      this.avis = null
      if (data[0] == 200) {
        Popup.show({
          type: 'Success',
          title: 'Commentaire',
          textBody: 'Deleveread vous remercie de votre commentaire',
          button: true,
          buttonText: 'Ok',
          callback: () => Popup.hide()
        })
        this.setState({
          noteCancel : true
        })
      }
    })
  }
}


_commentaire = () => {
  return (          
    <View style = {{alignItems: 'center'}}>
      <Carousel
        layout={'stack'}
        layoutCardOffset={`30`} 
        ref={(ref) => { this._carousel = ref; }}
        data={this.state.commente}
        renderItem={({item}) => <CommenteCountent commentes = {item}/>}
        sliderWidth={500}
        itemWidth={300}
      />
    </View>
  )
}
_reservation = () => {
  if(this.state.idAbonnement == null) {
    this.props.navigation.navigate('TypeSubscription', { id_book : this.props.route.params.id_book})
  }
  else {
    getSubscription(this.state.idAbonnement).then(data => {
      if(data.status == 'active') {
        this.props.navigation.navigate('Adresse', { id_book : this.props.route.params.id_book})
      }
      else {
        this.props.navigation.navigate('TypeSubscription', { id_book : this.props.route.params.id_book})
      }
    })
  }
}

_buttonNoter () {
  if (this.state.noteCancel == true) {  
     return(      
      <View style = {{flex : 1, justifyContent : 'center', alignItems : "center"}}>
        <TouchableOpacity 
            disabled = {this.state.noteCancel}
            onPress={() => {this.sendCommente()}}
            style = {{height : 50, width : 50, borderRadius : 100, backgroundColor : 'grey',alignItems : 'center', justifyContent: 'center' }}>
            <FontAwesome5 name="thumbs-up" color="white" size= {20}></FontAwesome5>
        </TouchableOpacity>
        <Text>Deja Noter</Text>
      </View>        
      )
    }
    else {
      return(
      <View style = {{flex : 1, justifyContent : 'center', alignItems : "center"}}>
        <TouchableOpacity 
            disabled = {this.state.noteCancel}
            onPress={() => {this.sendCommente()}}
            style = {{height : 50, width : 50, borderRadius : 100, backgroundColor : '#0C98D1',alignItems : 'center', justifyContent: 'center' }}>
            <FontAwesome5 name="thumbs-up" color="white" size= {20}></FontAwesome5>
        </TouchableOpacity>
        <Text>Noter</Text>
      </View>
      )
    }
}
_buttonReserve () {
  const { book } = this.state
  if (this.state.book != undefined) {
    if(book[0].id_commandebooks == null)
    {      
      return ( 
        <View style = {{flex : 1, justifyContent : 'center', alignItems : "center"}}>
          <TouchableOpacity 
            onPress={() => {this._reservation()}}
            style = {{height : 50, width : 50, borderRadius : 100, backgroundColor : '#EF800B',alignItems : 'center', justifyContent: 'center' }}>
              <FontAwesome5 name="book-open" color="white" size= {20}></FontAwesome5>
          </TouchableOpacity>
          <Text>Reserver</Text>
        </View>
        
      )
    }
    else {
      return(
        <View style = {{flex : 1, justifyContent : 'center', alignItems : "center"}}>
          <TouchableOpacity 
            disabled = {true}
            style = {{height : 50, width : 50, borderRadius : 100, backgroundColor : 'grey',alignItems : 'center', justifyContent: 'center' }}>
              <FontAwesome5 name="book-open" color="white" size= {20}></FontAwesome5>
          </TouchableOpacity>
        <Text>Deja Reservé</Text>
      </View>
      )

    }
  }
}
  render() {
    return (
      <Root>
        <View style={styles.main_container}>
            {this._displayLoading()}
            {this._displayBook()}
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
  },
  image: {
    height: 300,
    margin: 5,
    backgroundColor: 'gray',
  },
  etoiles_content : {
    alignItems : 'center'
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
  title_content : {
    textTransform : 'uppercase',
    fontStyle : 'italic',
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
  }
})
const mapStateToProps = (state) => {
  // Redux Store --> Component
 return {
    idUser: state.idUserReducer.idUser,
    idAbonnement: state.idAbonementReducer.idAbonnement
 }
}
export default connect(mapStateToProps) (BooksDetail)
