import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import CellLetter from "./CellLetter";

export default function CellLine({ disabled = true, inputLetter }: { disabled: boolean, inputLetter?: string }) {
    const [firstCellLetterSelected, setFirstCellLetterSelected] = useState(false);
    const [secondCellLetterSelected, setSeconCellLetterSelected] = useState(false);
    const [thirdCellLetterSelected, setThirdCellLetterSelected] = useState(false);
    const [fourthCellLetterSelected, setFourthCellLetterSelected] = useState(false);
    const [fifithCellLetterSelected, setfifthCellLetterSelected] = useState(false);

    useEffect(() => {
        if (firstCellLetterSelected) {
            setSeconCellLetterSelected(false);
            setThirdCellLetterSelected(false);
            setFourthCellLetterSelected(false);
            setfifthCellLetterSelected(false);
        }
    }, [firstCellLetterSelected])

    useEffect(() => {
        if (secondCellLetterSelected) {
            setFirstCellLetterSelected(false);
            setThirdCellLetterSelected(false);
            setFourthCellLetterSelected(false);
            setfifthCellLetterSelected(false);
        }
    }, [secondCellLetterSelected])

    useEffect(() => {
        if (thirdCellLetterSelected) {
            setFirstCellLetterSelected(false);
            setSeconCellLetterSelected(false);
            setFourthCellLetterSelected(false);
            setfifthCellLetterSelected(false);
        }
    }, [thirdCellLetterSelected])

    useEffect(() => {
        if (fourthCellLetterSelected) {
            setFirstCellLetterSelected(false);
            setSeconCellLetterSelected(false);
            setThirdCellLetterSelected(false);
            setfifthCellLetterSelected(false);
        }
    }, [fourthCellLetterSelected])

    useEffect(() => {
        if (fifithCellLetterSelected) {
            setFirstCellLetterSelected(false);
            setSeconCellLetterSelected(false);
            setThirdCellLetterSelected(false);
            setFourthCellLetterSelected(false);
        }
    }, [fifithCellLetterSelected])


    return (
        <View style={styles.container}>
            <CellLetter letter={inputLetter} disabled={disabled} onTouched={(event) => setFirstCellLetterSelected(event)} selected={firstCellLetterSelected} />
            <CellLetter letter={inputLetter} disabled={disabled} onTouched={(event) => setSeconCellLetterSelected(event)} selected={secondCellLetterSelected} />
            <CellLetter letter={inputLetter} disabled={disabled} onTouched={(event) => setThirdCellLetterSelected(event)} selected={thirdCellLetterSelected} />
            <CellLetter letter={inputLetter} disabled={disabled} onTouched={(event) => setFourthCellLetterSelected(event)} selected={fourthCellLetterSelected} />
            <CellLetter letter={inputLetter} disabled={disabled} onTouched={(event) => setfifthCellLetterSelected(event)} selected={fifithCellLetterSelected} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
})
