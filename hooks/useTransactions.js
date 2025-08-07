import { useSQLiteContext } from 'expo-sqlite'
import { useCallback, useState } from "react"
import { Alert } from "react-native"


export const useTransactions = () =>{
    const db = useSQLiteContext()
    const [transactions, setTransactions] = useState([])
    const [profile, setProfile] = useState([])
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
                await Promise.all([fetchTransactions(),fetchSummary(),getProfiles()])
            }catch(error){
                console.log(error)
            }finally{
                setLoading(false)
            }
        },[fetchTransactions,fetchSummary]
    )

    const deleteTransaction = async(id)=>{
        try{
           await db.runAsync(
            `DELETE FROM transactions WHERE id = ?`,
            [id]);   

            loadData() 
        }catch(error){  
            console.log(error)
            Alert.alert("Error", error.messge)
        }
    }
const createTransaction = async(title,formatedAmount,selectedCategory) => {
    try{
      await db.runAsync(`
            INSERT INTO transactions(title,amount,category)
            VALUES (? ,? , ?)`,[title,formatedAmount,selectedCategory]);
    }catch(e){
        console.log(e)
    }
}
const createProfile = async(name,currency)=> {
    try{
        await db.runAsync(`INSERT INTO profiles(name,currency) VALUES (?,?)`,[name,currency])
    }catch(e){
        console.log(e)
    }
}
const updateProfile = async (updatedName, updatedCurrency, p_id) => {
  const id = parseInt(p_id, 10);
  try {
    await db.runAsync(
      `UPDATE profiles SET name = ?, currency = ? WHERE id = ?`,
      [updatedName, updatedCurrency, id]
    );
  } catch (e) {
    console.log("Error updating profile:", e);
  }
};

const getProfiles = useCallback(
    async()=>{
       const results = await db.getAllAsync(`SELECT * FROM profiles`);
        const data = results
        setProfile(data)  
    },[]
)
 const deleteProfile = async(id)=>{
        try{
           await db.runAsync(
            `DELETE FROM profiles WHERE id = ?`,
            [id]);    
        }catch(error){  
            console.log(error)
            Alert.alert("Error", error.messge)
        }
    }    
return {transactions,summary,isLoading,loadData,deleteTransaction,createTransaction,createProfile,getProfiles,profile,updateProfile,deleteProfile}
} 