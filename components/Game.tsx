import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';

import Keyboard, { OnPressKeyboardEvent } from './Keyboard';
import TableLetterGame from './TableLetterGame';
import { IMainGameStore, Tentative, Word } from '../stores/main-game';
import FinishModal from './FinishModal';

function Game({ MainGameStore }: { MainGameStore?: IMainGameStore }) {
    const [selectedLetter, setSelectedLetter] = useState<OnPressKeyboardEvent | undefined>(undefined);
    const [word, setWord] = useState<Word>();
    const [tentatives, settentatives] = useState<Tentative[]>()
    const [isLoading, setisLoading] = useState(true)
    const [isGameOver, setIsGameOver] = useState(false);
    const [isModalOpen, setisModalOpen] = useState(false)

    useEffect(() => {
        GetWordWithTentatives()
    }, []);

    function GetWordWithTentatives() {
        setisLoading(true);
        MainGameStore?.getCurrentWord().then(dataWord => {
            MainGameStore?.getTentatives(dataWord?.id ?? 0).then(dataTentative => {
                if (dataWord.isCompleted) {
                    onCorrectedWord()
                }
                settentatives(dataTentative);
                setWord(dataWord);
                setisLoading(false);
            });
        });
    }

    function onLetterPressed(onPressKeyboardEvent: OnPressKeyboardEvent | undefined) {
        if (onPressKeyboardEvent) {
            setSelectedLetter(onPressKeyboardEvent)
        }
    }

    function onCorrectedWord() {
        setIsGameOver(true);
        setisModalOpen(true);
        MainGameStore?.getCurrentWord().then(dataWord => {
            MainGameStore?.getTentatives(dataWord?.id ?? 0).then(dataTentative => {
                settentatives(dataTentative);
                setWord(dataWord);
                setisLoading(false);
            });
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.gameContainer}>
                <TableLetterGame onCorrectedWord={onCorrectedWord} isCompleted={isGameOver} isLoading={isLoading} tentatives={tentatives} word={word} inputLetter={selectedLetter} />
            </View>
            <View style={styles.keyboardContainer}>
                <Keyboard onPress={onLetterPressed} />
            </View>

            <FinishModal isOpen={isModalOpen} />
        </View>
    )
}

export default inject("MainGameStore")(observer(Game));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gameContainer: {
        height: '70%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    keyboardContainer: {
        height: '30%',
        width: '100%'
    },
});