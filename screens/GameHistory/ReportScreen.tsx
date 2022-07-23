import { FlatList } from "react-native";
import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import { IReportStore } from "../../stores/report";
import { List } from "react-native-paper";
import { Word } from "../../stores/main-game";
import { format } from "date-fns";
import { useNavigation } from '@react-navigation/native';
import { ReportParamList } from "../../navigation/NavigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";

export type ReportScreenProps = {
    ReportStore: IReportStore
}

type NavigationProp = StackNavigationProp<ReportParamList, "Report">;

function ReportScreen({ ReportStore }: ReportScreenProps) {
    const navigation = useNavigation<NavigationProp>();
    const [words, setWords] = useState<Word[]>()

    useEffect(() => {
        ReportStore.GetNotFinishedWords().then(data => {
            setWords(data)
        })

        // ReportStore.GetTentatives().then(data => {
        //     console.log(data);
        // })
    }, [])

    function getFormattedDate(item: Date | undefined): string {
        if (item) {
            return format(item, 'dd/MM/yyyy')
        }
        return '';
    }

    function itemRender(wordItem: Word) {
        return (
            <>
                <List.Item
                    title={`Word: ${wordItem.word}`}
                    description={`Start date ${getFormattedDate(wordItem.startDate)} End date ${getFormattedDate(wordItem.finishDate)}`}
                    left={props => <List.Icon {...props} icon="folder" />}
                    right={props => <List.Icon {...props} icon="chevron-right" />}
                    onPress={() => navigation.navigate('ReportDetail', { word: wordItem })}
                />
            </>
        );
    }


    return (
        <>
            <FlatList
                data={words}
                renderItem={data => itemRender(data.item)}
                keyExtractor={item => item.id.toString()}
            />
        </>
    );
}

export default inject("ReportStore")(observer(ReportScreen));