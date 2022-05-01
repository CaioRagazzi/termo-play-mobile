import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, ViewStyle, StyleProp, ActivityIndicator } from "react-native";
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
    position?: number,
    rightLetter?: string,
    isLoading?: boolean,
}

export default function CellLetter({ letter, onTouched, selected, disabled = true, position, onLetterChange, historyLetter, rightLetter, isLoading }: CellLetterProps) {
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

    function getContainerStyle(): StyleProp<ViewStyle> {
        var stylesContainer: StyleProp<ViewStyle>[] = [];
        stylesContainer.push(styles.container)
        if (!isLoading) {
            if (rightLetter?.toLocaleLowerCase() === selectedLetter?.toLocaleLowerCase() && disabled) stylesContainer.push(styles.containerRightLetter);
            if (rightLetter?.toLocaleLowerCase() !== selectedLetter?.toLocaleLowerCase() && disabled) stylesContainer.push(styles.containerWrongLetter);
            if (disabled && !selectedLetter) stylesContainer.push(styles.containerDisabled);
            if (isPressed) stylesContainer.push(styles.containerPressed);
        }

        return stylesContainer;
    }

    return (
        <TouchableOpacity disabled={disabled} style={getContainerStyle()} onPress={onCellLetterPressed}>
            <View style={styles.containerCellLetter}>
                {
                    isLoading ?
                        <ActivityIndicator size="small" color="#0000ff" /> :
                        <Text adjustsFontSizeToFit style={styles.letter}>{selectedLetter?.toUpperCase()}</Text>
                }
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
    containerRightLetter: {
        backgroundColor: '#90ee90'
    },
    containerWrongLetter: {
        backgroundColor: '#ee9090'
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
