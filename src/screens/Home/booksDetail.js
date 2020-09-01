import React from 'react'
import { StyleSheet, View, ActivityIndicator, ScrollView , Text , Image, TouchableOpacity} from 'react-native'
import { getBooksid, postStar, getStar, getStatStar, getStatStarUser, getCommentaireAll } from '../../api/index'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux'
import {Card} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import CommenteCountent from '../../components/commenteCountent'

class BooksDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      book: undefined,
      isLoading: true,
      starCount: '',
      starDisabled : false,
      nombreVotant : '', 
      commente : '',
    }
  }
componentWillMount() {
  // getStar(this.props.idUser,this.props.route.params.id_book).then(data => {
  //   if(data[1].commentaire[0] == undefined) {
  //     console.log('null')
  //     this.setState({
  //       starCount : 0
  //     })
  //   }
  //   else {
  //     console.log('not null')
  //     this.setState({
  //       starCount : data[1].commentaire[0].note,
  //       starDisabled : true
  //     })
  //   }
  // })
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
    console.log(data[1].note[0].nombreVotant)
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
onStarRatingPress(rating) {
  postStar(rating, this.props.idUser,this.props.route.params.id_book).then(data => {
    this.setState({
      starCount: rating,
      starDisabled : true
    });
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


_displayBook() {
  const { book } = this.state
  console.log(this.state.commente)
  if (this.state.book != undefined) {
    return (
      <ScrollView style={styles.scrollview_container}>
          <Image
              style={styles.image}
              source={{uri: 'data:image/png;base64,' + book[0].image}}
          />
          <Text style={styles.title_text}>{book[0].titre}</Text>
          <View style = {styles.etoiles_content}>
              <StarRating
                disabled={true}
                fullStarColor = {'#E1D706'}
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
            <Text style= {{textAlign : 'center'}}>{this.state.nombreVotant} vote(s)</Text>
          </View>
          <Card style = {{borderWidth : 1, margin : 5, marginTop : 15}}>
            <Text style={styles.description_text}>{book[0].synopsys}</Text>
          </Card>
          <Text style={styles.default_text}>Auteur : {book[0].auteur}</Text>
          <Text style={styles.default_text}>Collection : {book[0].collection}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(book[0].dateSortie)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Prix : {book[0].prix}</Text>
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

      </ScrollView>
    )
  }
}

_reservation = () => {
  this.props.navigation.navigate('Adresse', { id_book : this.props.route.params.id_book})
}

_buttonReserve () {
  const { book } = this.state
  if (this.state.book != undefined) {
    if(book[0].id_commandebooks == null)
    {      
      return ( 
        <Button
          title="Reserver"
          onPress={() => {this._reservation()}}
          icone = {
            <Icon
                name="book-open"
                size={50}
                color="green"
            />
          }
        />
      )
    }
    else {
      return null
    }
  }
}
  render() {
    return (
      <View style={styles.main_container}>
          {this._displayLoading()}
          {this._displayBook()}
          {this._buttonReserve()}
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
 }
}
export default connect(mapStateToProps) (BooksDetail)
