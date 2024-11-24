import React from 'react';
import { Text,StyleSheet, TextInput, View } from 'react-native';
import {AntDesign} from '@expo/vector-icons'
import colors from '../misc/colors';
import iconSet from '@expo/vector-icons/build/Fontisto';

const SearchBar = ({containerStyle,value, onChangeText, onClear}) => {
    return (
      <View style = {[styles.container,{...containerStyle}]}>
        <TextInput value={value} onChangeText={onChangeText} style={styles.searchBar} placeholder='Pesquisar...'/>
        {value ? <AntDesign name='close' size={20} color={colors.PRIMARY} onPress={onClear} style={styles.icon}/> : null}
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      justifyContent:'center'
    },
    searchBar:{
        borderWidth:0.5,
        borderColor: colors.PRIMARY,
        height:45,
        borderRadius:20,
        paddingLeft:15,
        fontSize:18,
        textAlignVertical:'center',
    },
    icon:{
      position: 'absolute',
      right:10,
    }
})

export default SearchBar
