import SafeScreen from "@/components/SafeScreen";
import { Stack } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <SQLiteProvider
    databaseName='newDatabase.db'
    onInit={async(db)=>{
      await db.execAsync(`
      CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
      );
        PRAGMA journal_mode=WAL;
        `)
    }}
    options={{useNewConnection:false}}
    >
      <SafeScreen>
      <Stack screenOptions={{headerShown:false}}/>
      </SafeScreen>
      <StatusBar style="dark"/>
    </SQLiteProvider>
);
}
