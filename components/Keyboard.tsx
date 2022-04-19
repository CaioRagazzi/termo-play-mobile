import React from "react";
import { View, StyleSheet } from "react-native";
import Letter from "./Letter";

export default function Keyboard() {
    function onLetterPressed(param: string) {
        console.log(param);
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
            </View>
            <View style={styles.containerThirdLine}>
                <Letter onPress={onLetterPressed} style={styles.letter} letter="Z" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="X" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="C" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="V" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="B" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="N" />
                <Letter onPress={onLetterPressed} style={styles.letter} letter="M" />
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