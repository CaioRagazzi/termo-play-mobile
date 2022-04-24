import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';

import Keyboard, { OnPressKeyboardEvent } from './Keyboard';
import TableLetterGame from './TableLetterGame';
import { IMainGameStore, Word } from '../stores/main-game';

function Game({ MainGameStore }: { MainGameStore?: IMainGameStore }) {
    const [selectedLetter, setSelectedLetter] = useState<OnPressKeyboardEvent>({ letter: '', date: new Date, isDeleteLetter: false, isEnterLetter: false });
    const [activeLine, setActiveLine] = useState<number>(1)
    const [word, setWord] = useState<Word>();

    useEffect(() => {
        MainGameStore?.getCurrentWord().then(data => {
            setWord(data);
        });
    }, []);

    useEffect(() => {
        if (activeLine > 5) {
          setActiveLine(1);
        }
      }, [activeLine])

    function onLetterPressed(onPressKeyboardEvent: OnPressKeyboardEvent) {
        if (onPressKeyboardEvent.isEnterLetter) {
            setActiveLine(activeLine + 1)
        }
        setSelectedLetter(onPressKeyboardEvent)
    }

    return (
        <View style={styles.container}>
            <View style={styles.gameContainer}>
                <TableLetterGame word={word} activeLine={activeLine} inputLetter={selectedLetter} />
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