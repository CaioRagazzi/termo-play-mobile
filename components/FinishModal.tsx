import { BackHandler, Text } from "react-native";
import { inject, observer } from "mobx-react";
import { IMainGameStore, Tentative, Word } from "../stores/main-game";
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modalbox';
import { useEffect, useState } from "react";
import { View } from "./Themed";
import { differenceInMinutes, format } from "date-fns";

export type TableLetterGameProps = {
    isOpen: boolean,
    MainGameStore?: IMainGameStore
    ModalClose: () => void
}

function FinishModal({ MainGameStore, isOpen, ModalClose }: TableLetterGameProps) {

    const [internalIsModalOpen, setInternalIsModalOpen] = useState(false)
    const [word, setWord] = useState<Word | undefined>(undefined)
    const [tentatives, setTentatives] = useState<Tentative[] | undefined>(undefined)

    useEffect(() => {
        setInternalIsModalOpen(isOpen)
        getCurrentWord()
    }, [isOpen])

    function getCurrentWord() {
        MainGameStore?.getCurrentWord().then(word => {
            console.log(word);
            
            setWord(word);
            MainGameStore.getTentatives(word.id).then(tentatives => {
                setTentatives(tentatives)
            })
        })
    }

    function isCorrectTentativeWord(wordTentative: string){
        return wordTentative.toLowerCase() === word?.word;
    }

    function modalClosed() {
        ModalClose();
        setInternalIsModalOpen(false)
    }

    return (
        <Modal style={styles.container} isOpen={internalIsModalOpen} onClosed={() => modalClosed()}>
            <View style={styles.header}>
                {
                    word?.isCompleted ? 
                    <Text style={styles.headerTitleText}>Well Done!</Text> : 
                    <Text style={styles.headerTitleText}>Current Status</Text>
                }
            </View>
            <View style={styles.body}>
                <View style={{ paddingBottom: 10 }}>
                    <Text ><Text style={styles.highlightText} >Start Date:</Text> {word?.startDate ? format(word?.startDate, 'dd/MM/yyyy HH:mm:ss') : ''}</Text>
                    <Text ><Text style={styles.highlightText} >Finish Date:</Text> {word?.finishDate ? format(word?.finishDate, 'dd/MM/yyyy HH:mm:ss') : ''}</Text>
                    <Text ><Text style={styles.highlightText} >Total Minutes:</Text> {word?.finishDate && word?.startDate ? differenceInMinutes(word?.finishDate, word?.startDate) : ''}</Text>
                    {word?.isCompleted ? <Text ><Text style={styles.highlightText} >Correct Word:</Text> <Text style={{color: 'green'}}>{word?.word.toUpperCase()}</Text> </Text> : null}
                    <Text ><Text style={styles.highlightText} >Correct Word:</Text> <Text style={{color: 'green'}}>{word?.word.toUpperCase()}</Text> </Text>
                    <Text ><Text style={styles.highlightText} >Number of tentatives:</Text> {tentatives?.length} </Text>
                </View>
                {
                    tentatives?.map(item => {
                        return (
                            <View key={item.id} style={{ paddingBottom: 5 }}>
                                <Text ><Text style={styles.highlightText} >Tentative:</Text> {item.position} </Text>
                                <Text ><Text style={styles.highlightText} >Tentative Date:</Text> {item.tentaTiveDate ? format(item.tentaTiveDate, 'dd/MM/yyyy HH:mm:ss') : ''} </Text>
                                <Text ><Text style={[styles.highlightText]} >Tentative Word:</Text> <Text style={isCorrectTentativeWord(item.word) ? {color: 'green'} : {color: 'red'}}>{item.word}</Text></Text>
                            </View>
                        )
                    })
                }
            </View>
            <View style={styles.footer}>
                <Text >Next word: {word?.nextWordDate ? format(word?.nextWordDate, 'dd/MM/yyyy HH:mm:ss') : undefined}</Text>
            </View>
        </Modal>
    )
}

export default inject("MainGameStore")(observer(FinishModal));

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '80%',
        width: '80%',
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
        margin: 10
    },
    headerTitleText: {
        fontSize: 30,
        fontWeight: "bold"
    },
    highlightText:{
        fontWeight: "bold"
    }
})