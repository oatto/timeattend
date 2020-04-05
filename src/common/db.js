import SQLite from 'react-native-sqlite-storage';

function onError(err) {
    console.log("SQL Error: " + err);
    alert('Sorry, something wrong!');
}

function onOpen() {
    console.log("Database opened");
}

export const db = SQLite.openDatabase("timemint.db", "1.0", "Timemint Database", 200000, onOpen, onError);

export const executeSql = (sql) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            console.log('QUERY :' + sql);
            tx.executeSql(sql, [], (tx, results) => {
                resolve({tx, results})
            }, reject);
        });
    });
};

export async function prepareTable() {
    //await executeSql(`DROP TABLE IF EXISTS User`);
    await executeSql(`CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      accessToken VARCHAR(255),
      refreshToken VARCHAR(255),
      locale VARCHAR(10),
      lastUsername VARCHAR(100)
    )`);
}

export default db;
