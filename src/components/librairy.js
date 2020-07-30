import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
// Api
import { getToken, getBooksIdUser } from '../api/index'
// Redux
import { connect } from 'react-redux'
import LibrairyItem from './librairyItem'

class Librairy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        booksUser: [],
        user_id : ''
    }
}

UNSAFE_componentWillMount() {
  this._setbook()
}

_setbook = async () => {
  try {
    getToken(this.props.token).then(data => {
      this.setState({
        user_id: data[1].user.id_user,
      })
      getBooksIdUser(this.state.user_id).then(data => {
          this.setState({
            booksUser: data.book,
          })
      })
    })
  } catch (err) {
    console.log(err);
  }
};

    render() {
      return (
        // Components/Search.js
            <FlatList
                data={this.state.booksUser}
                keyExtractor={(item) => item.id_book.toString()}
                renderItem={({item}) => <LibrairyItem book = {item} displayDetailForFilm={this._displayDetailForFilm}/>}
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
   }
}

export default connect(mapStateToProps)(Librairy)