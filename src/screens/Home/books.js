import React from 'react'
import { FlatList, ActivityIndicator, View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native'
import { getBooks, getBookSearch } from '../../api/index'
import BooksItem from '../../components/booksItem'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class Books extends React.Component {
    constructor(props) {
        super(props)
        this.searchedText = ""
        this.myTextInput = React.createRef();
        this.state = {
            books: [],
            loading : true,
            isSelected: false,
        }
        this._setData()
    }
    onPress = () => {
        this.setState((prevState, prevProps) => ({
          isSelected: !prevState.isSelected
        }))
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
    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _searchBooks() {
        Keyboard.dismiss()
        this.myTextInput.current.clear();
        if(this.searchedText == ""){
            this._setData()
        }
        else {
            getBookSearch(this.searchedText).then(data => {
                this.setState({ books: data.book})
                this.searchedText = ""
            })
        }
    }

    _displayDetailForFilm = (id_book) => {
        this.props.navigation.navigate('BooksDetail', { id_book : id_book})
    }

    buttonSearch(){
        return(
            <View>
                <View style = {{flexDirection : 'row'}}>
                    <View style={{backgroundColor:'#E2E3E2', flexDirection:'row', marginLeft : 10,marginBottom : 10, marginTop : 10,borderRadius: 5, flex : 1}}>
                        <View style={{justifyContent : 'center', margin : 10}}>
                            <FontAwesome5
                                    name = 'search'
                                    size = {20}
                                    color = '#929191'
                            />
                        </View>
                        <TextInput
                                ref = {this.myTextInput}
                                style = {{flex : 1}}
                                placeholder="Rechercher"
                                onChangeText={(text) => this._searchTextInputChanged(text)}
                                clearButtonMode = 'always'
                                >
                        </TextInput>
                    </View>
                    <TouchableOpacity 
                        style = {{height : 50, width : 50, backgroundColor :'#379393', margin : 10,borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => this._searchBooks()}>
                        <Text style = {{color : 'white', fontSize: 17}}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const { isSelected } = this.state
        if(this.state.loading) {
            return(
                <View style={{flex: 1,justifyContent: "center"}}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )
        }
        return (
            <View style= {{flex : 1}}>
            {isSelected && this.buttonSearch()}
                <FlatList
                    data={this.state.books}
                    keyExtractor={(item) => item.id_book.toString()}
                    renderItem={({item}) => <BooksItem book = {item} displayDetailForFilm={this._displayDetailForFilm}/>}
                    onEndReachedThreshold={0.5}
                />
                 <TouchableOpacity style = {{ 
                     position: 'absolute',
                     width: 70,
                     height: 70,
                     right: 30,
                     top: 500,
                     borderRadius: 50,
                     backgroundColor: '#379393',
                     justifyContent: 'center',
                     alignItems: 'center',
                     shadowColor: "#000",
                     shadowOffset: {
                         width: 0,
                         height: 2,
                     },
                     shadowOpacity: 0.24,
                     shadowRadius: 3.80,
                     elevation: 5}} 
                     onPress={() => this.onPress()}>
                            <View style={{justifyContent : 'center', alignItems : 'center'}}>
                                <FontAwesome5
                                        name = 'search'
                                        size = {30}
                                        color = 'white'
                                />
                            </View>
                </TouchableOpacity>
            </View>

        )
    }
}

export default Books