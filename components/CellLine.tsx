import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Tentative } from "../stores/main-game";
import CellLetter from "./CellLetter";
import { OnPressKeyboardEvent } from "./Keyboard";
import Toast from 'react-native-toast-message';

export type CellLineProps = {
    disabled: boolean,
    inputLetter?: OnPressKeyboardEvent,
    position?: number,
    tentative?: Tentative,
    onWordChange?: (word?: string) => void,
}

export default function CellLine({ disabled = true, inputLetter, position, tentative, onWordChange }: CellLineProps) {
    const [firstCellLetterSelected, setFirstCellLetterSelected] = useState(false);
    const [secondCellLetterSelected, setSeconCellLetterSelected] = useState(false);
    const [thirdCellLetterSelected, setThirdCellLetterSelected] = useState(false);
    const [fourthCellLetterSelected, setFourthCellLetterSelected] = useState(false);
    const [fifithCellLetterSelected, setfifthCellLetterSelected] = useState(false);
    const [word, setWord] = useState<string[]>(['','','','','']);

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

    useEffect(() => {
      console.log(tentative);
    }, [tentative])

    useEffect(() => {
        onWordChange ? onWordChange(word[0]+word[1]+word[2]+word[3]+word[4]) : undefined
    }, [word])
    
    

    function onLetterChange(param: number | undefined, selectedLetter: string | undefined) {
        switch (param) {
            case 1:
                setSeconCellLetterSelected(true);
                let newArray = [selectedLetter ?? '',word[1],word[2],word[3],word[4]]
                setWord(newArray);
                break;
            case 2:
                setThirdCellLetterSelected(true);
                let newArray1 = [word[0],selectedLetter ?? '',word[2],word[3],word[4]]
                setWord(newArray1);
                break;
            case 3:
                setFourthCellLetterSelected(true);
                let newArray2 = [word[0],word[1],selectedLetter ?? '',word[3],word[4]]
                setWord(newArray2);
                break;
            case 4:
                setfifthCellLetterSelected(true);
                let newArray3 = [word[0],word[1],word[2],selectedLetter ?? '',word[4]]
                setWord(newArray3);
                break;
            case 5:
                setFirstCellLetterSelected(true);
                let newArray4 = [word[0],word[1],word[2],word[3],selectedLetter ?? '']
                setWord(newArray4);
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
