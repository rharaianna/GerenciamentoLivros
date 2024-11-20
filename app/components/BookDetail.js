import React from "react";
import { View, StyleSheet, Text,StatusBar } from "react-native";


const BookDetail = (props) => {
    const {book} = props.route.params;
    return(
        <View style={styles.container}> 
            <Text>{book.title}</Text>
            <Text>{book.author}</Text>
            <Text>{book.desc}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
    },
})

export default BookDetail;