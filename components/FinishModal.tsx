import { BackHandler, Text } from "react-native";
import { inject, observer } from "mobx-react";
import { IMainGameStore, Word } from "../stores/main-game";
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modalbox';
import { useEffect, useState } from "react";
import { View } from "./Themed";

export type TableLetterGameProps = {
    isOpen: boolean,
    MainGameStore?: IMainGameStore
}

function FinishModal({ MainGameStore, isOpen }: TableLetterGameProps) {

    const [internalIsModalOpen, setInternalIsModalOpen] = useState(false)
    const [word, setWord] = useState<Word | undefined>(undefined)

    useEffect(() => {
        setInternalIsModalOpen(isOpen)
        getCurrentWord()
    }, [isOpen])

    function getCurrentWord() {
        MainGameStore?.getCurrentWord().then(word => {
            setWord(word);
        })
    }

    return (
        <Modal style={styles.container} isOpen={internalIsModalOpen} onClosed={() => setInternalIsModalOpen(false)}>
            <View style={styles.header}>
                <Text style={styles.headerTitleText}>Congratulations!</Text>
            </View>
            <View style={styles.body}>
                <Text >Finish Date: {word?.finishDate}</Text>
                <Text >Start Date: {word?.startDate}</Text>
                <Text >Word: {word?.word} </Text>
            </View>
            <View style={styles.footer}>
                <Text >Footer!</Text>
            </View>
        </Modal>
    )
}

export default inject("MainGameStore")(observer(FinishModal));

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: 300,
        width: 300,
        borderRadius: 5,
    },
    header: {
        flexShrink: 1,
        margin: 10
    },
    body: {
        flex: 1,
        justifyContent: 'center',
    },
    footer: {
        flexShrink: 1,
    },
    headerTitleText: {
        fontSize: 30,
        fontWeight: "bold"
    }
})