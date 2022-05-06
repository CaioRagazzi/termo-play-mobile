import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { inject, observer } from 'mobx-react';

import Keyboard, { OnPressKeyboardEvent } from './Keyboard';
import TableLetterGame from './TableLetterGame';
import { IMainGameStore, Tentative, Word } from '../stores/main-game';
import Modal from 'react-native-modalbox';

function Game({ MainGameStore }: { MainGameStore?: IMainGameStore }) {
    const [selectedLetter, setSelectedLetter] = useState<OnPressKeyboardEvent | undefined>(undefined);
    const [word, setWord] = useState<Word>();
    const [tentatives, settentatives] = useState<Tentative[]>()
    const [isLoading, setisLoading] = useState(true)
    const [isGameOver, setIsGameOver] = useState(false);
    const [isModalOpen, setisModalOpen] = useState(false)

    useEffect(() => {
        console.log('starting');
        MainGameStore?.getCurrentWord().then(dataWord => {
            console.log('oi');
            MainGameStore?.getTentatives(dataWord?.id ?? 0).then(dataTentative => {
                if (dataWord.isCompleted) {
                    onGameOver()
                }
                settentatives(dataTentative);
                setWord(dataWord);
                setisLoading(false);
            });
        });
        // GetWordWithTentatives();
    }, []);

    function GetWordWithTentatives() {
        setisLoading(true);
        MainGameStore?.getCurrentWord().then(dataWord => {
            console.log('oi');
            MainGameStore?.getTentatives(dataWord?.id ?? 0).then(dataTentative => {
                if (dataWord.isCompleted) {
                    onGameOver()
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

    function onGameOver() {
        setIsGameOver(true);
        setisModalOpen(true);
        GetWordWithTentatives()
    }

    return (
        <View style={styles.container}>
            <View style={styles.gameContainer}>
                <TableLetterGame isCompleted={isGameOver} isLoading={isLoading} tentatives={tentatives} word={word} inputLetter={selectedLetter} />
            </View>
            <View style={styles.keyboardContainer}>
                <Keyboard onPress={onLetterPressed} />
            </View>

            <Modal style={[styles.modal]} isOpen={isModalOpen} onClosed={() => setisModalOpen(false)}>
                <Text >Game Over!</Text>
            </Modal>
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
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: 300,
        borderRadius: 5
    },
});