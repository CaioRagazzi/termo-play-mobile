import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { IMainGameStore, Tentative, Word } from "../stores/main-game";
import CellLine from "./CellLine";
import { OnPressKeyboardEvent } from "./Keyboard";
import Toast from 'react-native-toast-message';

export type TableLetterGameProps = {
    inputLetter?: OnPressKeyboardEvent,
    word?: Word,
    MainGameStore?: IMainGameStore
}

function TableLetterGame({ inputLetter, word, MainGameStore }: TableLetterGameProps) {
    const [activeLine, setActiveLine] = useState(0)
    const [tentative, setTentative] = useState<Tentative[]>()

    const [inputLetterFirstPosition, setinputLetterFirstPosition] = useState<OnPressKeyboardEvent | undefined>(undefined)
    const [inputLetterSecondPosition, setinputLetterSecondPosition] = useState<OnPressKeyboardEvent | undefined>(undefined)
    const [inputLetterThirdPosition, setinputLetterThirdPosition] = useState<OnPressKeyboardEvent | undefined>(undefined)
    const [inputLetterFourfthPosition, setinputLetterFourfthPosition] = useState<OnPressKeyboardEvent | undefined>(undefined)
    const [inputLetterFifthPosition, setinputLetterFifthPosition] = useState<OnPressKeyboardEvent | undefined>(undefined)

    const [writenWord, setWritenWord] = useState('');


    useEffect(() => {
        getTentatives();
    }, [word])

    function getTentatives() {
        MainGameStore?.getTentatives(word?.id ?? 0).then(data => {
            setTentative(data);
            setActiveLine(data.length + 1);
        });
    }

    useEffect(() => {
        if (!inputLetter) return;
        if (inputLetter?.isEnterLetter) {
            checkWord();
        }
        switch (activeLine) {
            case 1:
                setinputLetterFirstPosition(inputLetter)
                break;
            case 2:
                setinputLetterSecondPosition(inputLetter)
                break;
            case 3:
                setinputLetterThirdPosition(inputLetter)
                break;
            case 4:
                setinputLetterFourfthPosition(inputLetter)
                break;
            case 5:
                setinputLetterFifthPosition(inputLetter)
                break;
            default:
                break;
        }
    }, [inputLetter])

    function checkWord() {
        if (writenWord.length < 5) {
            Toast.show({
                type: 'error',
                text1: 'Word Incomplete',
                text2: 'Please select all words'
            });
        } else {
            saveTentative(writenWord)
        }
    }

    function saveTentative(wordToSave: string) {
        if (word) {
            let tentativeToSave = new Tentative();
            tentativeToSave.position = activeLine;
            tentativeToSave.tentaTiveDate = new Date();
            tentativeToSave.word = wordToSave;
            tentativeToSave.wordId = word.id;

            MainGameStore?.insertTentative(tentativeToSave).then(() => {
                getTentatives()
            });
        }
    }

    function getTentative(position: number): Tentative | undefined {
        let tentativeFiltered = tentative?.find(r => r.position === position);
        return tentativeFiltered;
    }

    function onWordChangeHandle(actualWord: string | undefined) {
        setWritenWord(actualWord ?? '');
    }

    return (
        <View style={styles.container}>
            <CellLine onWordChange={onWordChangeHandle} tentative={getTentative(1)} position={1} inputLetter={inputLetterFirstPosition} disabled={activeLine !== 1} />
            <CellLine onWordChange={onWordChangeHandle} tentative={getTentative(2)} position={2} inputLetter={inputLetterSecondPosition} disabled={activeLine !== 2} />
            <CellLine onWordChange={onWordChangeHandle} tentative={getTentative(3)} position={3} inputLetter={inputLetterThirdPosition} disabled={activeLine !== 3} />
            <CellLine onWordChange={onWordChangeHandle} tentative={getTentative(4)} position={4} inputLetter={inputLetterFourfthPosition} disabled={activeLine !== 4} />
            <CellLine onWordChange={onWordChangeHandle} tentative={getTentative(5)} position={5} inputLetter={inputLetterFifthPosition} disabled={activeLine !== 5} />
        </View>
    )
}

export default inject("MainGameStore")(observer(TableLetterGame));

const styles = StyleSheet.create({
    container: {

    },
})
