import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CellLetter({ letter, onTouched, selected, disabled = true }: { letter?: string, onTouched?: (state: boolean) => void, selected: boolean, disabled?: boolean }) {
    const [isPressed, setIsPressed] = useState(false);
    const [selectedLetter, setSelectedLetter] = useState('');

    useEffect(() => {
        onTouched ? onTouched(isPressed) : null;
    }, [isPressed])

    useEffect(() => {
        setIsPressed(selected);
    }, [selected])

    useEffect(() => {
      if (!disabled && selected && letter) {
        setSelectedLetter(letter);
      }
    }, [letter])
    

    function onCellLetterPressed() {
        setIsPressed(!isPressed);
    }

    return (
        <TouchableOpacity disabled={disabled} style={[styles.container, isPressed ? styles.containerPressed : null, disabled ? styles.containerDisabled : null]} onPress={onCellLetterPressed}>
            <View style={styles.containerCellLetter}>
                <Text adjustsFontSizeToFit style={styles.letter}>{selectedLetter?.toUpperCase()}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 5,
        height: windowHeight / 14,
        width: windowWidth / 10,
        margin: 5
    },
    containerPressed: {
        borderColor: 'blue',
        borderWidth: 2
    },
    containerDisabled: {
        backgroundColor: '#d3d3d3',
    },
    containerCellLetter: {
        flexGrow: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    letter: {
        fontSize: 26,
        fontWeight: 'bold'
    }
})
