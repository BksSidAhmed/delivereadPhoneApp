import React from 'react'
import { FlatList, ActivityIndicator, View} from 'react-native'
import { getBooks } from '../../api/index'
import BooksItem from '../../components/booksItem'

class Books extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            loading : true
        }
        this._setData()
    }
        _setData = async () => {            
          try {
            getBooks().then(data => {
                this.setState({ 
                    loading : false,
                    books: data.book,
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