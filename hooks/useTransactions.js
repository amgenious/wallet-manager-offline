import { useSQLiteContext } from 'expo-sqlite'
import { useCallback, useState } from "react"
import { Alert } from "react-native"


export const useTransactions = () =>{
    const db = useSQLiteContext()
    const [transactions, setTransactions] = useState([])
    const [summary,setSummary] = useState({
        balance:0,income:0,expenses:0
    })
    const [isLoading, setLoading] = useState(true)

    const fetchTransactions = useCallback(async()=>{
        try{
            const results = await db.getAllAsync(`SELECT * FROM transactions ORDER BY id DESC`);
            const data = results
            setTransactions(data)
        }catch(error){
            console.log(error)
        }
    },[])
    const fetchSummary = useCallback(async()=>{
        try{
            const balanceResult = await db.getAllAsync(`
                SELECT COALESCE(SUM(amount),0) as balance FROM transactions`)
            const incomeResult = await db.getAllAsync(`
            SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE amount > 0`)
            const expensesResult = await db.getAllAsync(`
            SELECT COALESCE(SUM(amount),0) as expenses FROM transactions WHERE amount < 0`)

            const data = ({
                balance: balanceResult[0].balance,
                income: incomeResult[0].income,
                expenses: expensesResult[0].expenses
            })
            setSummary(data)
        }catch(error){
            console.log(error)
        }
    },[])

    const loadData = useCallback(
        async()=>{
            setLoading(true)
            try{
                await Promise.all([fetchTransactions(),fetchSummary()])
            }catch(error){
                console.log(error)
            }finally{
                setLoading(false)
            }
        },[fetchTransactions,fetchSummary]
    )

    const deleteTransaction = async(title)=>{
        try{
           const response = await db.runAsync(
            `DELETE FROM transactions WHERE title = ?`,
            [title]
        );            
            loadData()
            Alert.alert("Success","Transaction deleted Successfully")    
        }catch(error){  
            console.log(error)
            Alert.alert("Error", error.messge)
        }
    }

    return {transactions,summary,isLoading,loadData,deleteTransaction}
} 