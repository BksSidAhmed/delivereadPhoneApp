import React from 'react'
import { FlatList, ActivityIndicator, View} from 'react-native'
import { getBooks } from '../api/index'
import BooksItem from '../components/booksItem'
import {requestACCESSFINELOCATIONPermission} from '../permission/accessFineLocation'

class Books extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            loading : false
        }
        requestACCESSFINELOCATIONPermission()
        this._setData()
    }
        _setData = async () => {            
        this.setState({ 
            loading : true
        })
          try {
            getBooks().then(data => {
                this.setState({ 
                    loading : false,
                    books: data.book,
                    // loading : false
                })
            })
          } catch (err) {
            console.log(err);
          }
    };

    _displayDetailForFilm = (id_book) => {
        this.props.navigation.navigate('BooksDetail', { id_book : id_book})
    }

    render() {
        console.log(this.state.books)
        if(this.state.loading) {
            return(
                <View style={{flex: 1,justifyContent: "center"}}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )
        }
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