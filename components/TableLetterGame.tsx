import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import CellLine from "./CellLine";

export default function TableLetterGame({ inputLetter }: { inputLetter: string }) {
    
    return (
        <View style={styles.container}>
            <CellLine inputLetter={inputLetter} disabled={false} />
            <CellLine inputLetter={inputLetter} disabled={true} />
            <CellLine inputLetter={inputLetter} disabled={true} />
            <CellLine inputLetter={inputLetter} disabled={true} />
            <CellLine inputLetter={inputLetter} disabled={true} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
})
