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
    rightWord?:string,
    isLoading?: boolean
}

export default function CellLine({ disabled = true, inputLetter, rightWord, tentative, onWordChange, isLoading }: CellLineProps) {
    const [firstCellLetterSelected, setFirstCellLetterSelected] = useState(false);
    const [secondCellLetterSelected, setSeconCellLetterSelected] = useState(false);
    const [thirdCellLetterSelected, setThirdCellLetterSelected] = useState(false);
    const [fourthCellLetterSelected, setFourthCellLetterSelected] = useState(false);
    const [fifithCellLetterSelected, setFifthCellLetterSelected] = useState(false);
    const [word, setWord] = useState<string[]>(['', '', '', '', '']);

    const [firstLetterHistory, setFirstLetterHistory] = useState<string | undefined>(undefined)
    const [secondLetterHistory, setSecondLetterHistory] = useState<string | undefined>(undefined)
    const [thirdLetterHistory, setThirdLetterHistory] = useState<string | undefined>(undefined)
    const [fourthLetterHistory, setFourthLetterHistory] = useState<string | undefined>(undefined)
    const [fifithLetterHistory, setFifthLetterHistory] = useState<string | undefined>(undefined)

    useEffect(() => {
        setFirstCellLetterSelected(true);
    }, [])

    useEffect(() => {
        if (disabled) {
            setFirstCellLetterSelected(false);
            setSeconCellLetterSelected(false);
            setThirdCellLetterSelected(false);
            setFourthCellLetterSelected(false);
            setFifthCellLetterSelected(false);
        } else {
            setFirstCellLetterSelected(true);
        }
    }, [disabled])

    useEffect(() => {
        if (firstCellLetterSelected) {
            setSeconCellLetterSelected(false);
            setThirdCellLetterSelected(false);
            setFourthCellLetterSelected(false);
            setFifthCellLetterSelected(false);
        }
    }, [firstCellLetterSelected])

    useEffect(() => {
        if (secondCellLetterSelected) {
            setFirstCellLetterSelected(false);
            setThirdCellLetterSelected(false);
            setFourthCellLetterSelected(false);
            setFifthCellLetterSelected(false);
        }
    }, [secondCellLetterSelected])

    useEffect(() => {
        if (thirdCellLetterSelected) {
            setFirstCellLetterSelected(false);
            setSeconCellLetterSelected(false);
            setFourthCellLetterSelected(false);
            setFifthCellLetterSelected(false);
        }
    }, [thirdCellLetterSelected])

    useEffect(() => {
        if (fourthCellLetterSelected) {
            setFirstCellLetterSelected(false);
            setSeconCellLetterSelected(false);
            setThirdCellLetterSelected(false);
            setFifthCellLetterSelected(false);
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
        onWordChange ? onWordChange(word[0] + word[1] + word[2] + word[3] + word[4]) : undefined
    }, [word])

    useEffect(() => {
        if (!tentative) return;
        setFirstLetterHistory(tentative.word[0])
        setSecondLetterHistory(tentative.word[1])
        setThirdLetterHistory(tentative.word[2])
        setFourthLetterHistory(tentative.word[3])
        setFifthLetterHistory(tentative.word[4])
    }, [tentative])

    function onLetterChange(param: number | undefined, selectedLetter: string | undefined) {
        switch (param) {
            case 1:
                setSeconCellLetterSelected(true);
                let newArray = [selectedLetter ?? '', word[1], word[2], word[3], word[4]]
                setWord(newArray);
                break;
            case 2:
                setThirdCellLetterSelected(true);
                let newArray1 = [word[0], selectedLetter ?? '', word[2], word[3], word[4]]
                setWord(newArray1);
                break;
            case 3:
                setFourthCellLetterSelected(true);
                let newArray2 = [word[0], word[1], selectedLetter ?? '', word[3], word[4]]
                setWord(newArray2);
                break;
            case 4:
                setFifthCellLetterSelected(true);
                let newArray3 = [word[0], word[1], word[2], selectedLetter ?? '', word[4]]
                setWord(newArray3);
                break;
            case 5:
                setFirstCellLetterSelected(true);
                let newArray4 = [word[0], word[1], word[2], word[3], selectedLetter ?? '']
                setWord(newArray4);
                break;
            default:
                break;
        }
    }

    return (
        <View style={styles.container}>
            <CellLetter isLoading={isLoading} rightLetter={rightWord?.[0]} historyLetter={firstLetterHistory} onLetterChange={onLetterChange} position={1} letter={inputLetter} disabled={disabled} onTouched={(event) => setFirstCellLetterSelected(event.state)} selected={firstCellLetterSelected} />
            <CellLetter isLoading={isLoading} rightLetter={rightWord?.[1]} historyLetter={secondLetterHistory} onLetterChange={onLetterChange} position={2} letter={inputLetter} disabled={disabled} onTouched={(event) => setSeconCellLetterSelected(event.state)} selected={secondCellLetterSelected} />
            <CellLetter isLoading={isLoading} rightLetter={rightWord?.[2]} historyLetter={thirdLetterHistory} onLetterChange={onLetterChange} position={3} letter={inputLetter} disabled={disabled} onTouched={(event) => setThirdCellLetterSelected(event.state)} selected={thirdCellLetterSelected} />
            <CellLetter isLoading={isLoading} rightLetter={rightWord?.[3]} historyLetter={fourthLetterHistory} onLetterChange={onLetterChange} position={4} letter={inputLetter} disabled={disabled} onTouched={(event) => setFourthCellLetterSelected(event.state)} selected={fourthCellLetterSelected} />
            <CellLetter isLoading={isLoading} rightLetter={rightWord?.[4]} historyLetter={fifithLetterHistory} onLetterChange={onLetterChange} position={5} letter={inputLetter} disabled={disabled} onTouched={(event) => setFifthCellLetterSelected(event.state)} selected={fifithCellLetterSelected} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
})
