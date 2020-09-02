import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import { Card } from 'react-native-paper'
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux'
import { getUserByIdUser } from '../api/index'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

class CommenteCountent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        nomUser : ''
    }
  }
    componentWillMount(){
        getUserByIdUser(this.props.idUser).then(data => {
           this.setState({
               nomUser : data.user[0].login
           })
        })
    }
    render() {
        const commentes = this.props.commentes
        console.log(commentes)
        return (
                <Card style={styles.main_container}>
                    <View style = {{alignItems:'flex-end', flexDirection : 'row'}}> 
                        <View style = {{ flex : 1,margin : 16}}>
                          <View style = {{flexDirection : 'row'}}>
                            <View style = {{borderWidth : 1, borderRadius : 20, height : 25, width: 25, justifyContent: 'center', alignItems : 'center'}}>
                              <FontAwesome5 name="user" color="black" size= {15}></FontAwesome5>
                            </View>
                            <View style = {{marginLeft : 10, marginTop : 3}}>
                              <Text>
                                {commentes.login}
                              </Text>
                            </View>
                          </View>
                        </View>                   
                        <View style = {{width : 70, margin : 22}}>
                            <StarRating
                                disabled={true}
                                fullStarColor = {'#E1D706'}
                                starSize = {10}
                                spacing={4}
                                maxStars={5}
                                rating={commentes.note}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />
                        </View>
                    </View>
                    <View style = {{margin : 5, flex : 1, backgroundColor : '#ECEFEC', borderRadius : 5, borderWidth : 1}}>
                        <Text style = {{fontSize : 18, margin : 5, fontStyle: 'italic', color: '#666666'}} numberOfLines={6}>{commentes.commentaire}</Text>
                    </View>
                </Card>
        )
      }
    }
    
    const styles = StyleSheet.create({
      main_container: {
        marginTop : 20,
        height : 400,
        marginBottom : 20
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
      circle_green: {
        marginTop : 10,
        width: 15,
        height: 15,
        borderRadius: 150/2,
        backgroundColor: 'green'
      },
      circle_red: {
        marginTop : 10,
        width: 15,
        height: 15,
        borderRadius: 150/2,
        backgroundColor: 'red'
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
      idUser: state.idUserReducer.idUser,
   }
  }
  export default connect(mapStateToProps) (CommenteCountent)