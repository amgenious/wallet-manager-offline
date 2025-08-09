import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { useEffect, useState } from 'react'
import { Alert, FlatList, Image, Modal, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../../assets/styles/home.styles'
import BalanceCard from "../../components/BalanceCard"
import NoTransactionsFound from "../../components/NoTransactionsFound"
import PageLoaderPage from '../../components/PageLoader'
import ProfileCard from "../../components/ProfileCard"
import TransactionItem from "../../components/TransactionItem"
import { COLORS } from "../../contants/colors"
import { useTransactions } from "../../hooks/useTransactions"
import Create from "./create"



export default function Page() {
const {transactions,summary,isLoading,deleteTransaction,loadData,profile}=useTransactions()
  const [refreshing, setRefreshing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [isComing, setIsComing] = useState(true)
  const onRefresh = async() => {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
    setIsComing(false)
  }
  useEffect(()=>{
    onRefresh()
  },[])

  const handleCloseModal = () => {
    setModalVisible(false)
    loadData()
  }
  const handleDelete = (id)=>{
    Alert.alert("Delete Transaction", "Are you sure you want to delete this transaction",[
      {text:"Cancel", style:"cancel"},
      {text:"Delete",style:"destructive",onPress:()=> deleteTransaction(id)}
    ])
  }
if(isComing && !refreshing) return <PageLoaderPage setIsComing={setIsComing}/>
if (profile.length == 0){
  return <ProfileCard />
} else {
  return (
    <View style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={require("../../assets/images/logo.png")}
            resizeMethod='contain'
            style={styles.headerLogo}
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.welcomeText2}>{profile[0].name}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => {setModalVisible(true)}}>
              <Ionicons name='add-circle' size={20} color={"#fff"}/>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate({ pathname: "/settings", params: { id: profile[0].id } })}>
              <Ionicons name='settings' size={20} color={COLORS.primary}/>
            </TouchableOpacity>
          </View>
        </View>
      <BalanceCard summary={summary} currency={profile[0].currency}/>
      <View style={styles.transactionsHeaderContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
      </View>
      </View>
      <FlatList 
      style={styles.transactionsList}
      contentContainerStyle={styles.transactionsListContent}
      data={transactions}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      renderItem={({item})=>(
        <TransactionItem item={item} onDelete={handleDelete} />
      )}
      ListEmptyComponent={<NoTransactionsFound setModalVisible={setModalVisible}/>}
      showsVerticalScrollIndicator={false}
      />
      <Modal
      animationType="slide"
      visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(false);
          }}
      >
        <Create handleCloseModal={handleCloseModal} setModalVisible={setModalVisible} currency={profile[0].currency}/>
      </Modal>
    </View>
   
  )
}
}