import { RootTabScreenProps } from "../types";
import { Text } from "react-native";
import { inject, observer } from "mobx-react";
import { useEffect } from "react";
import ReportStore, { IReportStore } from "../stores/report";
import { Avatar, Card, IconButton, Button, Title, Paragraph } from "react-native-paper";

export type ReportScreenProps = {
    ReportStore: IReportStore,
    navigation: RootTabScreenProps<'ReportScreen'>,
}

function ReportScreen({ ReportStore, navigation }: ReportScreenProps) {

    useEffect(() => {
        ReportStore.GetWords().then(data => {
            console.log('words', data);
        })
        // ReportStore.GetTentatives().then(data => {
        //     console.log(data);
        // })
    }, [])


    return (
        <>
            <Card onPress={() => console.log('oi')}>
                <Card.Title
                    title="Card Title"
                    subtitle="Card Subtitle"
                    left={() => <Avatar.Icon size={30} icon="folder" />}
                    right={() => <IconButton size={30} icon="chevron-right" />}
                />
                <Card.Content>
                    <Title>Card title</Title>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            </Card>
        </>
    );
}

export default inject("ReportStore")(observer(ReportScreen));