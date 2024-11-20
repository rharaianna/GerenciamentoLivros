import React from "react";
import { View, StyleSheet, Text,StatusBar, TouchableOpacity } from "react-native";
import colors from "../misc/colors";

const Book = ({item, onPress}) => {
    const{title,author, desc} = item;
    return(
        <TouchableOpacity onPress={onPress} style={styles.container}> 
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text numberOfLines={1}>{author}</Text>
            <Text numberOfLines={2}>{desc}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PRIMARY,
        padding: 10,
        marginVertical:10,
        borderRadius:10,
    },
    title:{
        fontWeight:'bold',
        fontSize: 16,
        color:colors.LIGHT,
    },
})

export default Book;