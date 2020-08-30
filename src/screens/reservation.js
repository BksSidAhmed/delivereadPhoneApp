//import * as React from 'react'
import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Keyboard } from 'react-native'
// Redux
import { connect } from 'react-redux'
import { getBooksid, postCommandeBook, postCommandeBookid } from '../api/index'
import moment from 'moment'
import { Input, Button, Overlay} from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Root, Popup} from 'popup-ui';
import {IncrementBooks} from '../redux/actions/booksAction'
// import {DecrementBooks} from '../redux/actions/BooksAction'

class Reservation extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            book: undefined,
            isLoading: true,
            isDateTimePickerVisible: false,
            dateTime : '',
            adresse : '',
            textErro : "",
            isVisible: false,
          } 
          this.props.route.params.adress
        //{this.props.idUser}
    }

    componentDidMount() {
        getBooksid(this.props.route.params.id_book).then(data => {
            this.setState({
                book: data.book,
                isLoading: false
            })
        })
        this.setState({
            adresse : this.props.route.params.adress
        })
    } 
    _buttonCommande() {
        var timemoment = moment().format('YYYY-MM-DD hh:mm:ss')
        var time = moment(timemoment).add(2, 'h').format('YYYY-MM-DD hh:mm:ss');
        console.log(this.props.books)
        {
            this.props.books > 5 ? (
                Popup.show({
                    type: 'Danger',
                    title: 'Reservation',
                    textBody: 'Malheureusement vous avez deja commandé 5 livre veuillez en rendre 1 si vous souhaité commander ce livre',
                    button: true,
                    buttonText: 'Ok',
                    callback: () =>  this.props.navigation.navigate('books')
                })
            ) : (
                postCommandeBook(time, this.state.adresse , this.props.idUser, this.props.route.params.id_book).then(data => {
                    if(data[0] == 400) {
                        this.setState({
                            textErro : data[1].msg
                        })
                        Popup.show({
                            type: 'Danger',
                            title: 'Reservation',
                            textBody: this.state.textErro,
                            button: true,
                            buttonText: 'Ok',
                            callback: () => this.props.navigation.navigate('books')
                        })
                    }
                    else{
                        Popup.show({
                            type: 'Success',
                            title: 'Reservation',
                            textBody: this.state.textErro,
                            button: true,
                            buttonText: 'Ok',
                            callback: () =>  postCommandeBookid(data[1].data.insertId,this.props.route.params.id_book).then(data => {
                                this.props.navigation.navigate('books')
                            })
                        })
                        this.props.IncrementBooks()
                    }
                })
            )

        }
    }

    synopsys(){
        return (
            this.setState({
                isVisible: true
            })
        );
    }

    Overlay() {
        return (
            <Overlay isVisible={this.state.isVisible} 
                onBackdropPress={() => this.setState({ isVisible: false })} 
                width='auto' 
                height='auto'>
                <FontAwesome5 
                        name='book-reader' 
                        size={50} 
                        color='black' 
                        style={{textAlign:'center', padding:10}}>
                </FontAwesome5>
                <Text style={{textAlign:'center', fontSize:15, padding:5}}>
                    {this.state.book[0].synopsys}
                </Text>
            </Overlay>
        )
    }
    _displayBook() {
        const { book } = this.state
        if(this.state.book != undefined) {
            return ( 
                <Root>
                    <View style={styles.main_container}>
                            <View style = {styles.content_header}>
                                <Image
                                    style={styles.image}
                                    source={{uri: 'data:image/png;base64,' + book[0].image}}
                                />
                                <View style={styles.content_title_info}>
                                    <View>
                                        <Text style={styles.title_text} numberOfLines={1}> {book[0].titre}</Text>
                                    </View>
                                    <View style={styles.content_infoBook}>
                                        <View style={styles.content_Auteur} >
                                            <Text style={styles.info_text}> Auteur : </Text>
                                            <Text style={styles.info_textbdd}> {book[0].auteur}</Text>
                                        </View>
                                        <View style={styles.content_Auteur} >
                                            <Text style={styles.info_text}> Editeur : </Text>
                                            <Text style={styles.info_textbdd}> {book[0].editeur}</Text>
                                        </View>
                                        <View style={styles.content_Auteur} >
                                            <Text style={styles.info_text}> Collection : </Text>                                  
                                            <Text style={styles.info_textbdd}> {book[0].collection}</Text>
                                        </View>
                                        <View style={styles.content_Auteur} >
                                            <Text style={styles.info_text}> Nombre de page :</Text>
                                            <Text style={styles.info_textbdd}> {book[0].nombrePage}</Text>
                                        </View>
                                        <View style={styles.content_Auteur} >
                                            <Text style={styles.info_text}> Publication :</Text>
                                            <Text style={styles.info_textbdd}> {moment(new Date(book[0].dateSortie)).format('DD/MM/YYYY')}</Text>
                                        </View>
                                        <TouchableOpacity 
                                            onPress = {() => this.synopsys()}
                                            style={styles.TouchableOpacitySynopsys}>
                                            <Text style = {styles.synopsys_text}>Synopsys -></Text>
                                        </TouchableOpacity>
                                        </View>
                            </View>
                        </View>
                        <View style = {styles.content_body}>  
                            <View>
                                <Input 
                                    placeholder = 'Adresse de livraison'
                                    value={this.state.adresse}
                                    disabled = {true}
                                    inputStyle={{fontSize : 15}}
                                    leftIcon = {
                                        <FontAwesome5
                                            name = 'map-marker-alt'
                                            size = {20}
                                            color = 'black'
                                        />
                                    }
                                    placeholderTextColor='black'
                                />
                            <Button
                                astyle = {{justifyContent : 'center'}}
                                title="Valider votre commande"
                                loading = {false}
                                onPress = {() => this._buttonCommande()}
                            />
                            </View>
                            {this.Overlay()}
                        </View>
                    </View>
                </Root>
            )
        }
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
    render() {
        // const { book } = this.state
        // this.props.IncrementBooks()
        console.log(this.props.books)
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayBook()}
            </View>
            
          )
    }
}
const mapStateToProps = (state) => {
   return {
        idUser: state.idUserReducer.idUser,
        books : state.booksReducer.books
   }
}

const styles = StyleSheet.create({
    main_container: {
        flex : 1,
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
    content_header: {
        flexDirection: 'row',
        flex : 2
    },
    content_body: {
        flex : 1,
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },
    content_title_info : {
        flex : 1
    },
    content_Auteur : {
        flexDirection: 'row',
    },
    content_infoBook : {
        flex : 2
    },
    title_text : {
        fontWeight: 'bold',
        fontSize: 25,
        flexWrap: 'wrap',
        paddingRight: 3,
    },
    info_text : {
        fontWeight: 'normal',
        color : '#717171',
        fontSize: 15,
        fontStyle: 'italic',
        flexWrap: 'wrap',
        paddingRight: 3,
        paddingTop: 3
    },
    info_textbdd : {
        fontWeight: 'normal',
        color : 'black',
        fontSize: 15,
        fontStyle: 'normal',
        flexWrap: 'wrap',
        paddingRight: 3,
        paddingTop: 3
    },
    synopsys_text : {
        fontWeight: 'normal',
        color : 'blue',
        fontSize: 20,
        fontStyle: 'italic',
        flexWrap: 'wrap',
        textAlign: 'right',
        marginTop : 5,
        marginRight : 5
    },
  })

export default connect(mapStateToProps,{IncrementBooks})(Reservation)