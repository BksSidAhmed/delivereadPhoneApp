import React from 'react'
import { StyleSheet, View, ActivityIndicator, ScrollView , Text , Image} from 'react-native'
import { getBooksid } from '../api/index'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';


class BooksDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      book: undefined,
      isLoading: true 
    }
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


_displayBook() {
  const { book } = this.state
  if (this.state.book != undefined) {
    return (
      <ScrollView style={styles.scrollview_container}>
          <Image
              style={styles.image}
              source={{uri: 'data:image/png;base64,' + book[0].image}}
          />
          <Text style={styles.title_text}>{book[0].titre}</Text>
          <Text style={styles.description_text}>{book[0].synopsys}</Text>
          <Text style={styles.default_text}>Auteur : {book[0].auteur}</Text>
          <Text style={styles.default_text}>Collection : {book[0].collection}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(book[0].dateSortie)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Prix : {book[0].prix}</Text>
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
    height: 169,
    margin: 5,
    backgroundColor: 'gray',
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

export default BooksDetail
