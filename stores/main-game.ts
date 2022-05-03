import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";
import * as SQLite from "expo-sqlite";
import { format } from "date-fns";

export interface IMainGameStore {
    getCurrentWord: () => Promise<Word>;
    getTentatives: (wordId: number) => Promise<Tentative[]>
    insertTentative: (tentative: Tentative) => Promise<void>
    completeWord: (wordId: number) => Promise<void>
}

export class Word {
    id: number = 0;
    word: string = '';
    startDate!: Date;
    isCurrent: number = 0;
    isCompleted: boolean = false;
}

export class Tentative {
    id: number = 0;
    word: string = '';
    tentaTiveDate!: Date;
    wordId: number = 0;
    position: number = 0;
}

class MainGameStore implements IMainGameStore {
    db!: SQLite.WebSQLDatabase;

    constructor() {
        makeAutoObservable(this)
        // this.dropTableWord();
        // this.dropTableTentative();
        // this.createWordTableIfNotExists();
        // this.createTentativesTableIfNotExists();
        // this.insertCurrentWord('caios', new Date);
        // this.selectFrom();
    }

    openDatabase() {
        this.db = SQLite.openDatabase("db.db");
    }

    createWordTableIfNotExists(): Promise<string> {
        this.openDatabase();

        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS Word (word TEXT NOT NULL, start_date TEXT NOT NULL, is_current INTEGER, is_complete INTEGER )`,
                    [],
                    (_, { rows: { _array } }) => {
                        resolve('created!')
                    },
                    (_, error) => {
                        reject(error);
                        return true;
                    }
                );
            });
        })
    }

    createTentativesTableIfNotExists(): Promise<string> {
        this.openDatabase();

        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS Tentative (word TEXT NOT NULL, tentative_date TEXT NOT NULL, position INTEGER, main_game_id INTEGER, FOREIGN KEY (main_game_id) REFERENCES Word (rowid) )`,
                    [],
                    (_, { rows: { _array } }) => {
                        resolve('created!')
                    },
                    (_, error) => {
                        reject(error);
                        return true;
                    }
                );
            });
        })
    }

    dropTableWord(): Promise<string> {
        this.openDatabase();
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `drop table Word`,
                    [],
                    (_, { rows: { _array } }) => {
                        resolve('Table Dropped')
                    },
                    (_, error) => {
                        reject(error);
                        return true;
                    }
                );
            });
        })
    }

    dropTableTentative(): Promise<string> {
        this.openDatabase();
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `drop table Tentative`,
                    [],
                    (_, { rows: { _array } }) => {
                        resolve('Table Dropped')
                    },
                    (_, error) => {
                        reject(error);
                        return true;
                    }
                );
            });
        })
    }

    insertCurrentWord(word: string, startDate: Date): Promise<string> {
        let formatedDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss")
        this.openDatabase();
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `insert into Word (word, start_date, is_current) values (?, ?, 1)`,
                    [word, formatedDate],
                    (_, { rows: { _array } }) => {
                        resolve('Inserted!');
                    },
                    (_, error) => {
                        reject(error);
                        return true;
                    }
                );
            });
        })
    }

    getCurrentWord(): Promise<Word> {
        this.openDatabase();
        let word: Word = new Word();

        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `Select rowid, * from Word where is_current = 1`,
                    [],
                    (_, { rows: { _array } }) => {
                        _array.forEach(dbWord => {
                            word.id = dbWord.rowid;
                            word.isCurrent = dbWord.is_current;
                            word.startDate = dbWord.start_date;
                            word.word = dbWord.word;
                            word.isCompleted = dbWord.is_complete ? true : false;
                        })
                        resolve(word);
                    },
                    (_, error) => {
                        reject(error);
                        return true;
                    }
                );
            });
        })
    }

    getTentatives(wordId: number): Promise<Tentative[]> {
        this.openDatabase();
        let tentatives: Tentative[] = [];
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `Select rowid, * from Tentative where main_game_id = ?`,
                    [wordId],
                    (_, { rows: { _array } }) => {
                        _array.forEach(dbWord => {
                            let tentative = new Tentative();

                            tentative.id = dbWord.rowid;
                            tentative.word = dbWord.word;
                            tentative.wordId = dbWord.main_game_id;
                            tentative.tentaTiveDate = dbWord.tentative_date;
                            tentative.position = dbWord.position;

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
    }

    completeWord(wordId: number): Promise<void> {
        this.openDatabase();
        let tentatives: Tentative[] = [];
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `update Word set is_complete = 1 where rowid = ?`,
                    [wordId],
                    (_, { rows: { _array } }) => {
                        resolve();
                    },
                    (_, error) => {
                        reject(error);
                        return true;
                    }
                );
            });
        })
    }

    insertTentative(tentative: Tentative): Promise<void> {
        this.openDatabase();
        let tentatives: Tentative[] = [];
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `insert into Tentative(word, tentative_date, position, main_game_id) values (?,?,?,?)`,
                    [tentative.word, format(tentative.tentaTiveDate, "yyyy-MM-dd'T'HH:mm:ss"), tentative.position, tentative.wordId],
                    (_, { rows: { _array } }) => {
                        resolve();
                    },
                    (_, error) => {
                        reject(error);
                        return true;
                    }
                );
            });
        })
    }
}

export default new MainGameStore();