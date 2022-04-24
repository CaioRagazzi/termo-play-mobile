import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Word } from "../stores/main-game";
import CellLine from "./CellLine";
import { OnPressKeyboardEvent } from "./Keyboard";

export type TableLetterGameProps = {
    inputLetter?: OnPressKeyboardEvent,
    activeLine: number,
    word?: Word
}

export default function TableLetterGame({ inputLetter, activeLine, word }: TableLetterGameProps) {
    useEffect(() => {
        console.log(word);
        
    }, [word])

    return (
        <View style={styles.container}>
            <CellLine position={1} inputLetter={inputLetter} disabled={activeLine !== 1} />
            <CellLine position={2} inputLetter={inputLetter} disabled={activeLine !== 2} />
            <CellLine position={3} inputLetter={inputLetter} disabled={activeLine !== 3} />
            <CellLine position={4} inputLetter={inputLetter} disabled={activeLine !== 4} />
            <CellLine position={5} inputLetter={inputLetter} disabled={activeLine !== 5} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
})
