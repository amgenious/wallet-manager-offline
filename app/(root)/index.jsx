import { styles } from "@/assets/styles/home.styles.js"
import { SignOutButton } from '@/components/SignOutButton'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import BalanceCard from "../../components/BalanceCard"
import NoTransactionsFound from '../../components/NoTransactionsFound'
import PageLoaderPage from '../../components/PageLoader'
import TransactionItem from '../../components/TransactionItem'
import { useTransactions } from "../../hooks/useTransactions"


export default function Page() {
const {transactions,summary,isLoading,deleteTransaction,loadData}=useTransactions()
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async() => {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
  }
  useEffect(()=>{
    loadData()
  },[])
  const handleDelete = (id)=>{
    Alert.alert("Delete Transaction", "Are you sure you want to delete this transaction",[
      {text:"Cancel", style:"cancel"},
      {text:"Delete",style:"destructive",onPress:()=> deleteTransaction(id)}
    ])
  }
if(isLoading && !refreshing) return <PageLoaderPage />
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={require("../../assets/images/logo.png")}
            resizeMethod='contain'
            style={styles.headerLogo}
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={()=>router.push("/create")}>
              <Ionicons name='add' size={20} color={"#fff"}/>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>
      <BalanceCard summary={summary} />
      <View style={styles.transactionsHeaderContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
      </View>
      </View>
      <FlatList 
      style={styles.transactionsList}
      contentContainerStyle={styles.transactionsListContent}
      data={transactions}
      renderItem={({item})=>(
        <TransactionItem item={item} onDelete={handleDelete} />
      )}
      ListEmptyComponent={<NoTransactionsFound />}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl 
      refreshing={refreshing}
      onRefresh={onRefresh}
      />}
      />
    </View>
  )
}