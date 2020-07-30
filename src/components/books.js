import React from 'react'
import { FlatList} from 'react-native'
import { getBooks } from '../api/index'
import BooksItem from './booksItem'
import {requestACCESSFINELOCATIONPermission} from '../permission/accessFineLocation'

class Books extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
        requestACCESSFINELOCATIONPermission()
        this._setData()
    }
        _setData = async () => {
          try {
            getBooks().then(data => {
                this.setState({ books: data.book })
            })
          } catch (err) {
            console.log(err);
          }
    };

    _displayDetailForFilm = (id_book) => {
        this.props.navigation.navigate('BooksDetail', { id_book : id_book})
    }

    render() {
        return (
                <FlatList
                    data={this.state.books}
                    keyExtractor={(item) => item.id_book.toString()}
                    renderItem={({item}) => <BooksItem book = {item} displayDetailForFilm={this._displayDetailForFilm}/>}
                    onEndReachedThreshold={0.5}
                />
        )
    }
}

export default Books