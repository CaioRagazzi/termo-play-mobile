import { parseISO } from "date-fns";
import * as SQLite from "expo-sqlite";
import { makeAutoObservable } from "mobx";
import { Tentative, Word } from "./main-game";

export interface IReportStore {
    GetTentatives: () => Promise<Tentative[]>;
    GetWords: () => Promise<Word[]>;
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

    async GetWords(): Promise<Word[]> {
        var promise = new Promise<Word[]>((resolve, reject) => {
            this.openDatabase();
            let words: Word[] = [];
            this.db.transaction((tx) => {
                tx.executeSql(
                    `Select rowid, * from Word`,
                    [],
                    (_, { rows: { _array } }) => {
                        _array.forEach(dbWord => {
                            let word = new Word();
                            word.id = dbWord.rowid;
                            word.word = dbWord.word;
                            word.startDate = parseISO(dbWord.start_date);
                            word.finishDate = dbWord.finish_date;
                            word.isCurrent = dbWord.is_current;
                            word.isCompleted = dbWord.is_complete;
                            word.nextWordDate = dbWord.next_word_date;

                            words.push(word);
                        })
                        resolve(words);
                    },
                    (_, error) => {
                        reject(error);
                        return true;
                    }
                );
            });
        });
        let responseDb = await promise;

        return responseDb;
    }
}

export default new ReportStore();