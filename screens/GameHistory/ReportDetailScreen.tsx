import { inject, observer } from "mobx-react";
import { IReportStore } from "../../stores/report";
import { Text } from 'react-native-paper';

export type ReportDetailScreenProps = {
    ReportStore: IReportStore,
    navigation: undefined,
}

function ReportScreen({ ReportStore, navigation }: ReportDetailScreenProps) {
    return (
        <>
            <Text>Display Large</Text>
        </>
    );
}

export default inject("ReportStore")(observer(ReportScreen));