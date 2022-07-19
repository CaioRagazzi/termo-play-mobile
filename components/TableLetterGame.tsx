import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { IMainGameStore, Tentative, Word } from "../stores/main-game";
import CellLine from "./CellLine";
import { OnPressKeyboardEvent } from "./Keyboard";
import Toast from 'react-native-toast-message';

export type TableLetterGameProps = {
    inputLetter?: OnPressKeyboardEvent,
    onCorrectedWord?: () => void
    word?: Word,
    MainGameStore?: IMainGameStore,
    tentatives?: Tentative[],
    isLoading?: boolean,
    isCompleted?: boolean,
}

function TableLetterGame({ inputLetter, word, MainGameStore, tentatives, isLoading, onCorrectedWord, isCompleted }: TableLetterGameProps) {
    const [activeLine, setActiveLine] = useState(0)

    const [inputLetterFirstPosition, setinputLetterFirstPosition] = useState<OnPressKeyboardEvent | undefined>(undefined)
    const [inputLetterSecondPosition, setinputLetterSecondPosition] = useState<OnPressKeyboardEvent | undefined>(undefined)
    const [inputLetterThirdPosition, setinputLetterThirdPosition] = useState<OnPressKeyboardEvent | undefined>(undefined)
    const [inputLetterFourfthPosition, setinputLetterFourfthPosition] = useState<OnPressKeyboardEvent | undefined>(undefined)
    const [inputLetterFifthPosition, setinputLetterFifthPosition] = useState<OnPressKeyboardEvent | undefined>(undefined)

    const [writenWord, setWritenWord] = useState('');

    const [loadTentatives, setLoadTentatives] = useState<Tentative[]>();

    useEffect(() => {
        setLoadTentatives(tentatives);
        if (tentatives && !isCompleted) {
            setActiveLine(tentatives.length + 1);
        }

        if (isCompleted) {
            setActiveLine(-1)
        }
    }, [tentatives, isCompleted])

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
                text2: 'Please select all letters'
            });
        } else {            
            if (writenWord.toLowerCase() === word?.word.toLowerCase()) {
                setWritenWord('');
                completeWord(word.id);
                saveTentative(writenWord, true);
                return;
            }
            setWritenWord('');
            saveTentative(writenWord, false);
        }
    }

    function getTentatives() {
        MainGameStore?.getTentatives(word?.id ?? 0).then(data => {            
            setActiveLine(data.length + 1);
        });
    }

    function completeWord(wordId: number) {
        MainGameStore?.completeWord(wordId).then(() => {
            if (onCorrectedWord) onCorrectedWord();
        });
    }

    function saveTentative(wordToSave: string, isCompleted: boolean) {
        if (word) {
            let tentativeToSave = new Tentative();
            tentativeToSave.position = activeLine;
            tentativeToSave.tentaTiveDate = new Date();
            tentativeToSave.word = wordToSave;
            tentativeToSave.wordId = word.id;

            MainGameStore?.insertTentative(tentativeToSave).then(() => {
                if (!isCompleted) {
                    getTentatives()
                }
            });

            if (activeLine === 1) {
                SetStartDate()
            }
        }
    }

    function SetStartDate() {
        if (word?.id) {
            MainGameStore?.setStartDateWord(word?.id).then(() => {
            });
        }
    }

    function getTentative(position: number): Tentative | undefined {
        let tentativeFiltered = tentatives?.find(r => r.position === position);
        return tentativeFiltered;
    }

    function onWordChangeHandle(actualWord: string | undefined) {
        setWritenWord(actualWord ?? '');
    }

    return (
        <View style={styles.container}>
            <CellLine isLoading={isLoading} rightWord={word?.word} onWordChange={onWordChangeHandle} tentative={getTentative(1)} position={1} inputLetter={inputLetterFirstPosition} disabled={activeLine !== 1} />
            <CellLine isLoading={isLoading} rightWord={word?.word} onWordChange={onWordChangeHandle} tentative={getTentative(2)} position={2} inputLetter={inputLetterSecondPosition} disabled={activeLine !== 2} />
            <CellLine isLoading={isLoading} rightWord={word?.word} onWordChange={onWordChangeHandle} tentative={getTentative(3)} position={3} inputLetter={inputLetterThirdPosition} disabled={activeLine !== 3} />
            <CellLine isLoading={isLoading} rightWord={word?.word} onWordChange={onWordChangeHandle} tentative={getTentative(4)} position={4} inputLetter={inputLetterFourfthPosition} disabled={activeLine !== 4} />
            <CellLine isLoading={isLoading} rightWord={word?.word} onWordChange={onWordChangeHandle} tentative={getTentative(5)} position={5} inputLetter={inputLetterFifthPosition} disabled={activeLine !== 5} />
        </View>
    )
}

export default inject("MainGameStore")(observer(TableLetterGame));

const styles = StyleSheet.create({
    container: {

    },
})
