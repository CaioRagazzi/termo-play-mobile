import { RootTabScreenProps } from "../types";
import { Text } from "react-native";
import { inject, observer } from "mobx-react";
import { useEffect } from "react";
import ReportStore, { IReportStore } from "../stores/report";

export type ReportScreenProps = {
    ReportStore: IReportStore,
    navigation: RootTabScreenProps<'ReportScreen'>,
}

function ReportScreen({ ReportStore, navigation }: ReportScreenProps) {

    useEffect(() => {
        ReportStore.GetTentatives().then(data => {
            console.log(data);
        })
    }, [])


    return (
        <>
            <Text>Olá</Text>
        </>
    );
}

export default inject("ReportStore")(observer(ReportScreen));