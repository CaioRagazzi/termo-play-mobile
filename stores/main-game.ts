import { makeAutoObservable } from "mobx";
import * as SQLite from "expo-sqlite";
import { add, compareDesc, format, parseISO } from "date-fns";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import RandomWords from "random-words";

export interface IMainGameStore {
    getCurrentWord: () => Promise<Word>;
    getTentatives: (wordId: number) => Promise<Tentative[]>
    insertTentative: (tentative: Tentative) => Promise<void>
    completeWord: (wordId: number) => Promise<void[]>
    setStartDateWord: (wordId: number) => Promise<void>
}

export class Word {
    id: number = 0;
    word: string = '';
    startDate?: Date;
    finishDate?: Date;
    isCurrent: number = 0;
    isCompleted: boolean = false;
    nextWordDate!: Date;
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
    backGroundName: string = 'background-fetch'
    setIntervalInstance: NodeJS.Timer | null = null;

    constructor() {
        makeAutoObservable(this)
        this.clearSetInterVal();
        // this.dropTableWord();
        // this.dropTableTentative();
        // this.createWordTableIfNotExists();
        // this.createTentativesTableIfNotExists();
        // this.insertCurrentWord('caios', new Date);
        // this.checkStatusAsync().then((data) => {
        //     if (data) {
        //         this.unregisterBackgroundFetchAsync().then(() => {
        //             this.defineTask().then(() => {
        //                 this.registerBackgroundFetchAsync().then(() => {
        //                 })
        //             })
        //         })
        //     }
        //     this.defineTask().then(() => {
        //         this.registerBackgroundFetchAsync().then(() => {
        //         })
        //     })
        // })

        this.startNewWordChecker();
    }

    async checkStatusAsync() {
        const isRegistered = await TaskManager.isTaskRegisteredAsync(this.backGroundName);
        return isRegistered;
    };

    openDatabase() {
        this.db = SQLite.openDatabase("db.db");
    }

    createWordTableIfNotExists(): Promise<string> {
        this.openDatabase();

        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS Word (word TEXT NOT NULL, start_date TEXT, is_current INTEGER, is_complete INTEGER, finish_date TEXT, next_word_date TEXT)`,
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

    insertCurrentWord(word: string): Promise<string> {
        let nextWordDate = format(add(new Date(), { days: 1 }), "yyyy-MM-dd'T'HH:mm:ss")
        this.openDatabase();
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `insert into Word (word, is_current, next_word_date) values (?, 1, ?)`,
                    [word, nextWordDate],
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

    async getCurrentWord(): Promise<Word> {
        var promise = new Promise<Word>((resolve, reject) => {
            this.openDatabase();
            let word: Word = new Word();
            this.db.transaction((tx) => {
                tx.executeSql(
                    `Select rowid, * from Word where is_current = 1`,
                    [],
                    (_, { rows: { _array } }) => {
                        _array.forEach(dbWord => {
                            word.id = dbWord.rowid;
                            word.isCurrent = dbWord.is_current;
                            word.startDate = dbWord.start_date ? parseISO(dbWord.start_date) : undefined;
                            word.word = dbWord.word;
                            word.isCompleted = dbWord.is_complete ? true : false;
                            word.finishDate = dbWord.finish_date ? parseISO(dbWord.finish_date) : undefined;
                            word.nextWordDate = parseISO(dbWord.next_word_date)
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
        let responseDb = await promise;

        return responseDb;
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
                            tentative.tentaTiveDate = parseISO(dbWord.tentative_date);
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

    completeWord(wordId: number): Promise<void[]> {
        this.openDatabase();
        let formatedCurrentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")
        let setCompletePromise = new Promise<void>((resolve, reject) => {
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
        let setCurrentDatePromise = new Promise<void>((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `update Word set finish_date = ? where rowid = ?`,
                    [formatedCurrentDate, wordId],
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

        return Promise.all([setCompletePromise, setCurrentDatePromise])
    }

    setStartDateWord(wordId: number): Promise<void> {
        this.openDatabase();
        let formatedCurrentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `update Word set start_date = ? where rowid = ?`,
                    [formatedCurrentDate, wordId],
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

    async registerBackgroundFetchAsync() {
        return BackgroundFetch.registerTaskAsync(this.backGroundName, {
            minimumInterval: 1, // 15 minutes
            stopOnTerminate: false, // android only,
            startOnBoot: true, // android only
        });
    }

    async unregisterBackgroundFetchAsync() {
        return BackgroundFetch.unregisterTaskAsync(this.backGroundName);
    }

    async defineTask() {
        TaskManager.defineTask(this.backGroundName, async () => {
            const now = Date.now();
            console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
            return BackgroundFetch.BackgroundFetchResult.NewData;
        });
    }

    async startNewWordChecker() {
        await this.wordChecker();;
        this.setIntervalInstance = setInterval(async () => {
            await this.wordChecker();
        }, 5000)
    }

    async wordChecker() {
        let needsToChange = await this.checkIfNeedsToFinishCurrentGame();
        if (needsToChange) {
            await this.setCurrentWordNotCurrent();
            var randomWord = this.getRandomWord();
            await this.insertCurrentWord(randomWord);
        }
    }

    getRandomWord() {
        var wordsRandom = RandomWords({ exactly: 100, maxLength: 5 })
        let wordToReturn: string = '';
        wordsRandom.map(word => {
            if (word.length === 5) {
                wordToReturn = word;
            }
        })
        if (wordToReturn === '') {
            this.getRandomWord();
        }
        return wordToReturn;
    }

    async setCurrentWordNotCurrent() {
        let currentWord = await this.getCurrentWord()

        return new Promise<void>((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    `update Word set is_current = ? where rowid = ?`,
                    [0, currentWord.id],
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

    async checkIfNeedsToFinishCurrentGame() {
        let currentWord = await this.getCurrentWord()
        return compareDesc(currentWord.nextWordDate, new Date()) === 1
    }

    clearSetInterVal() {
        if (this.setIntervalInstance !== null) {
            clearInterval(this.setIntervalInstance)
        }
    }


}

export default new MainGameStore();