import React from 'react';
import { Text,StyleSheet, TextInput, View } from 'react-native';
import colors from '../misc/colors';

const SearchBar = ({containerStyle}) => {
    return (
      <View style = {[styles.container,{...containerStyle}]}>
        <TextInput style={styles.searchBar} placeholder='Pesquisar...'/>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    searchBar:{
        borderWidth:0.5,
        borderColor: colors.PRIMARY,
        height:40,
        borderRadius:20,
        paddingLeft:15,
        fontSize:18,
        textAlignVertical:'center',
    },
})

export default SearchBar
