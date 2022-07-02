import { parseISO } from "date-fns";
import * as SQLite from "expo-sqlite";
import { makeAutoObservable } from "mobx";
import { Tentative } from "./main-game";

export interface IReportStore {
    GetTentatives: () => Promise<Tentative[]>;
}

class ReportStore implements IReportStore {
    db!: SQLite.WebSQLDatabase;

    constructor() {
        makeAutoObservable(this)
    }

    openDatabase() {
        this.db = SQLite.openDatabase("db.db");
    }

    async GetTentatives(): Promise<Tentative[]> {
        var promise = new Promise<Tentative[]>((resolve, reject) => {
            this.openDatabase();
            let tentatives: Tentative[] = [];
            this.db.transaction((tx) => {
                tx.executeSql(
                    `Select rowid, * from Tentative`,
                    [],
                    (_, { rows: { _array } }) => {
                        _array.forEach(dbWord => {
                            let tentative = new Tentative();
                            tentative.id = dbWord.rowid;
                            tentative.word = dbWord.word;
                            tentative.tentaTiveDate = parseISO(dbWord.tentative_date);
                            tentative.position = dbWord.position;
                            tentative.wordId = dbWord.main_game_id;

                            tentatives.push(tentative);
                        })
                        resolve(tentatives);
                    },
                    (_, error) => {
                        reject(error);
                        return true;
                    }
                );
            });
        })
        let responseDb = await promise;

        return responseDb;
    }
}

export default new ReportStore();