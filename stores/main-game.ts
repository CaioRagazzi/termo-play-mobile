import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";
import * as SQLite from "expo-sqlite";

export interface IMainGameStore{
    mainGame: string;
    db: SQLite.WebSQLDatabase;
}

class MainGameStore implements IMainGameStore {
    mainGame = 'TESTANDO';
    db!: SQLite.WebSQLDatabase;

    constructor() {
        makeAutoObservable(this)
        this.openDatabase();
        // this.createTableIfNotExists();
        this.selectFrom();
        // this.dropTable();
    }

    openDatabase() {
        console.log('open database');
        
        this.db = SQLite.openDatabase("db.db");
    }

    createTableIfNotExists() {
        this.db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS MainGame`,
                [],
                (_, { rows: { _array } }) => { },
                (_, error) => {
                    console.log(error);
                    return true;
                }
            );
        });
    }

    selectFrom() {
        console.log('oi');
        
        this.db.transaction((tx) => {
            tx.executeSql(
                `Select * from MainGame`,
                [],
                (_, { rows: { _array } }) => {
                    console.log(_array);
                },
                (_, error) => {
                    console.log(error);
                    return true;
                }
            );
        });
    }

    dropTable() {
        this.db.transaction((tx) => {
            tx.executeSql(
                `drop table MainGame`,
                [],
                (_, { rows: { _array } }) => {
                    console.log(_array);
                },
                (_, error) => {
                    console.log(error);
                    return true;
                }
            );
        });
    }
}

export default new MainGameStore();