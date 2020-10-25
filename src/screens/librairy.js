import React from 'react'
import { StyleSheet, FlatList,Text } from 'react-native'
// Api
import { getBooksIdUser } from '../api/index'
// Redux
import { connect } from 'react-redux'
import LibrairyItem from '../components/librairyItem'
import { View } from 'react-native-animatable'

class Librairy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        booksUser: [],
    }
}

UNSAFE_componentWillMount() {
  getBooksIdUser(this.props.idUser).then(data => {
    this.setState({
      booksUser: data.book,
    })
  })
}
_displayDetailForBook = (id_book) => {
  this.props.navigation.navigate('librairyRender', { id_book : id_book, id_commande : this.state.booksUser[0].id_Commande})
}
    render() {
      if(this.state.booksUser.length == 0){
        return(
          <View style = {{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
            <Text>
              Vous n'avez commander aucun livre....
            </Text>
          </View>
        )
      }
      return (
            <FlatList
                data={this.state.booksUser}
                keyExtractor={(item) => item.id_book.toString()}
                renderItem={({item}) => <LibrairyItem book = {item} displayDetailForBook={this._displayDetailForBook}/>}
                onEndReachedThreshold={0.5}
            />
      )
    }
}

const styles = StyleSheet.create({
    main_container: {
      height: 190,
      flexDirection: 'row'
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
    vote_text: {
      fontWeight: 'bold',
      fontSize: 26,
      color: '#666666'
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
    }
  })
  
  const mapStateToProps = (state) => {
    // Redux Store --> Component
   return {
       token: state.tokenReducer.token,
       idUser : state.idUserReducer.idUser
   }
}

export default connect(mapStateToProps)(Librairy)