import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle, Dimensions, TouchableOpacity } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type DeleteLetterProps = {
    style?: StyleProp<ViewStyle>,
    onPress?: (date: Date) => void,
}

export default function DeleteLetter({ style, onPress }: DeleteLetterProps) {
    
    function handlePressLetter() {      
        onPress ? onPress(new Date) : null
    }

    return (
        <TouchableOpacity onPress={handlePressLetter} style={[styles.container, style]}>
            <View style={styles.containerLetter}>
                <Text adjustsFontSizeToFit style={styles.letter}>⌫</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 5,
        height: windowHeight / 14,
        width: windowWidth / 12,
    },
    containerLetter: {
        flexGrow: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    letter: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})