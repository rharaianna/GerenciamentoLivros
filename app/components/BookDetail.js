import React from "react";
import { View, StyleSheet, Text,StatusBar, ScrollView } from "react-native";
import RoundBtn from "./RoundBtn";
import colors from "../misc/colors";


const BookDetail = (props) => {
    const {book} = props.route.params;

    const foramDate = (ms) =>{ 
        const date = new Date (ms)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const hours = date.getHours()
        const min = date.getMinutes()
        return `${day}/${month}/${year} - ${hours}:${min}`
    }

    return(
        <>
            <ScrollView contentContainerStyle={styles.container}> 
                <Text style={styles.time}>{`Criado em ${foramDate(book.time)}`}</Text>
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.author}>{book.author}</Text>
                <Text style={styles.desc}>{book.desc}</Text>
            </ScrollView>
            <View style={styles.btnContainer}>
                <RoundBtn antIconName='delete' style={{backgroundColor: colors.ERROR}} onPress={() => console.log("deletando")}/>
                <RoundBtn antIconName='edit' onPress={() => console.log("editando")}/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        margin:20,
        paddingTop: 50,
    },
    title:{
       fontSize:35,
       fontWeight: '900',

    },
    author:{
        fontSize:25,
        fontWeight: '800',
        fontStyle: 'italic', 
        opacity: 0.5,
    },
    desc:{
        fontSize:20,
    },
    time:{
        textAlign:'right',
        fontSize:12,
        opacity:0.5,
    },
    btnContainer:{
        position:'absolute',
        right: 20,
        bottom:50,
        gap:15,
    }
})

export default BookDetail;