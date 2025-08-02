import { styles } from "@/assets/styles/home.styles.js"
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../contants/colors'

const NoTransactionsFound = ({ setModalVisible}) => {
    const router = useRouter()
  return (
    <View style={styles.emptyState}>
      <Ionicons name='receipt-outline'
      size={60} color={COLORS.textLight}
      style={styles.emptyStateIcon}
      />
      <Text style={styles.emptyStateTitle}>No transactions yet</Text>
      <Text style={styles.emptyStateText}>
        Start tracking your finances by adding your first transaction
      </Text>
      <TouchableOpacity style={styles.emptyStateButton} onPress={()=> setModalVisible(true)}>
        <Ionicons name='add-circle' size={18} color={COLORS.white} />
        <Text style={styles.emptyStateButtonText}>Add Transactions</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NoTransactionsFound