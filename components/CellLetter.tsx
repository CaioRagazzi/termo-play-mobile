import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import { OnPressKeyboardEvent } from "./Keyboard";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type OnCellLetterTouched = {
    state: boolean,
    position?: number
}

type CellLetterProps = {
    letter?: OnPressKeyboardEvent,
    onTouched?: (event: OnCellLetterTouched) => void,
    onLetterChange?: (position?: number, selectedLetter?: string) => void,
    historyLetter?: string;
    selected: boolean,
    disabled?: boolean,
    position?: number
}

export default function CellLetter({ letter, onTouched, selected, disabled = true, position, onLetterChange, historyLetter }: CellLetterProps) {
    const [isPressed, setIsPressed] = useState(false);
    const [selectedLetter, setSelectedLetter] = useState('');

    useEffect(() => {
        if (historyLetter) {
            setSelectedLetter(historyLetter);
        }
    }, [historyLetter])
    

    useEffect(() => {
        onTouched ? onTouched({ state: isPressed, position }) : null;
    }, [isPressed])

    useEffect(() => {
        setIsPressed(selected);
    }, [selected])

    useEffect(() => {
        if (!disabled && selected && letter) {
            if (letter.isDeleteLetter) {
                setSelectedLetter('');
                return;
            }
            if (letter.isEnterLetter) return;
            setSelectedLetter(letter.letter);
            onLetterChange ? onLetterChange(position, letter.letter) : undefined
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
