import React from "react";
import { View, StyleSheet, Text,StatusBar, TouchableOpacity } from "react-native";
import colors from "../misc/colors";

const Book = ({item, onPress}) => {
    const{title,author, desc} = item;
    return(
        <TouchableOpacity onPress={onPress} style={styles.container}> 
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={styles.author} numberOfLines={1}>{author}</Text>
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
        fontWeight:'900',
        fontSize: 18,
        color:colors.LIGHT,
    },
    author:{
        fontStyle:'italic',
        fontWeight:'800',
        color:colors.LIGHT,
        opacity:0.8,

    }
})

export default Book;