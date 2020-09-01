import React  from 'react'
import { View, Text} from 'react-native'


class LibrairyRender extends React.Component {

    render() {      
        return (
            <View >
                <Text>
                    {this.props.route.params.id_book}
                </Text>
            </View>
        )
    }
}

export default LibrairyRender