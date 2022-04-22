import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import CellLetter from "./CellLetter";
import { OnPressKeyboardEvent } from "./Keyboard";

export type CellLineProps = {
    disabled: boolean,
    inputLetter?: OnPressKeyboardEvent,
    position?: number,
}

export default function CellLine({ disabled = true, inputLetter, position }: CellLineProps) {
    const [firstCellLetterSelected, setFirstCellLetterSelected] = useState(false);
    const [secondCellLetterSelected, setSeconCellLetterSelected] = useState(false);
    const [thirdCellLetterSelected, setThirdCellLetterSelected] = useState(false);
    const [fourthCellLetterSelected, setFourthCellLetterSelected] = useState(false);
    const [fifithCellLetterSelected, setfifthCellLetterSelected] = useState(false);

    useEffect(() => {
        setFirstCellLetterSelected(true);
    }, [])

    useEffect(() => {
        if (disabled) {
            setFirstCellLetterSelected(false);
            setSeconCellLetterSelected(false);
            setThirdCellLetterSelected(false);
            setFourthCellLetterSelected(false);
            setfifthCellLetterSelected(false);
        } else {
            setFirstCellLetterSelected(true);
        }
    }, [disabled])

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

    function onLetterChange(param: number | undefined) {
        switch (param) {
            case 1:
                setSeconCellLetterSelected(true);
                break;
            case 2:
                setThirdCellLetterSelected(true);
                break;
            case 3:
                setFourthCellLetterSelected(true);
                break;
            case 4:
                setfifthCellLetterSelected(true);
                break;
            case 5:
                setFirstCellLetterSelected(true);
                break;
            default:
                break;
        }
    }

    return (
        <View style={styles.container}>
            <CellLetter onLetterChange={onLetterChange} position={1} letter={inputLetter} disabled={disabled} onTouched={(event) => setFirstCellLetterSelected(event.state)} selected={firstCellLetterSelected} />
            <CellLetter onLetterChange={onLetterChange} position={2} letter={inputLetter} disabled={disabled} onTouched={(event) => setSeconCellLetterSelected(event.state)} selected={secondCellLetterSelected} />
            <CellLetter onLetterChange={onLetterChange} position={3} letter={inputLetter} disabled={disabled} onTouched={(event) => setThirdCellLetterSelected(event.state)} selected={thirdCellLetterSelected} />
            <CellLetter onLetterChange={onLetterChange} position={4} letter={inputLetter} disabled={disabled} onTouched={(event) => setFourthCellLetterSelected(event.state)} selected={fourthCellLetterSelected} />
            <CellLetter onLetterChange={onLetterChange} position={5} letter={inputLetter} disabled={disabled} onTouched={(event) => setfifthCellLetterSelected(event.state)} selected={fifithCellLetterSelected} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
})
