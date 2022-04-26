import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';

import Keyboard, { OnPressKeyboardEvent } from './Keyboard';
import TableLetterGame from './TableLetterGame';
import { IMainGameStore, Word } from '../stores/main-game';

function Game({ MainGameStore }: { MainGameStore?: IMainGameStore }) {
    const [selectedLetter, setSelectedLetter] = useState<OnPressKeyboardEvent | undefined>(undefined);
    const [word, setWord] = useState<Word>();

    useEffect(() => {
        MainGameStore?.getCurrentWord().then(data => {
            setWord(data);
        });
    }, []);

    function onLetterPressed(onPressKeyboardEvent: OnPressKeyboardEvent | undefined) {
        if (onPressKeyboardEvent) {
            setSelectedLetter(onPressKeyboardEvent)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.gameContainer}>
                <TableLetterGame word={word} inputLetter={selectedLetter} />
            </View>
            <View style={styles.keyboardContainer}>
                <Keyboard onPress={onLetterPressed} />
            </View>
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