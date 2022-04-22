import React from "react";
import { View, StyleSheet } from "react-native";
import DeleteLetter from "./DeleteLetter";
import EnterLetter from "./EnterLetter";
import Letter from "./Letter";

export type OnPressKeyboardEvent = {
    letter: string, 
    date: Date, 
    isDeleteLetter: boolean
    isEnterLetter: boolean
}
type KeyboardProps = {
    onPress?: (event: OnPressKeyboardEvent) => void,
}

export default function Keyboard({ onPress }: KeyboardProps) {
    function onLetterPressed(letter: string, date: Date) {
        onPress ? onPress({date, isDeleteLetter: false, letter, isEnterLetter: false}) : null;
    }

    function onDeletedLetterPressed(date: Date) {
        onPress ? onPress({date, isDeleteLetter: true, letter: '', isEnterLetter: false}) : null;
    }

    function onEnterLetterPressed(date: Date) {
        onPress ? onPress({date, isDeleteLetter: false, letter: '', isEnterLetter: true}) : null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerFirstLine}>
                <Letter onPress={onLetterPressed} style={styles.letter} letter="Q" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="W" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="E" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="R" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="T" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="Y" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="U" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="I" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="O" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="P" />
            </View>
            <View style={styles.containerSecondLine}>
                <Letter onPress={onLetterPressed} style={styles.letter} letter="A" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="S" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="D" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="F" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="G" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="H" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="J" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="K" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="L" />
                <DeleteLetter onPress={onDeletedLetterPressed} style={styles.letter} />
            </View>
            <View style={styles.containerThirdLine}>
                <Letter onPress={onLetterPressed} style={styles.letter} letter="Z" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="X" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="C" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="V" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="B" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="N" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="M" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="M" />
                <EnterLetter onPress={onEnterLetterPressed} style={styles.letter} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    letter: {
        marginVertical: 2,
        paddingHorizontal: 2,
        marginHorizontal: 2
    },
    containerFirstLine: {
        flexDirection: 'row',
    },
    containerSecondLine: {
        paddingLeft: 12,
        flexDirection: 'row',
    },
    containerThirdLine: {
        paddingLeft: 22,
        flexDirection: 'row',
    }
})