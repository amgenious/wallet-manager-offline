import { styles } from "@/assets/styles/home.styles.js"
import { Text, View } from 'react-native'
import { COLORS } from '../contants/colors'
import { useTransactions } from '../hooks/useTransactions'

const BalanceCard = ({summary,currency}) => {
  const {profile} = useTransactions()
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>{currency}{parseFloat(summary.balance).toFixed(2)}</Text>
      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
            <Text style={styles.balanceStatLabel}>Income</Text>
            <Text style={[styles.balanceStatAmount, {color:COLORS.income}]}>
                +{currency}{parseFloat(summary.income).toFixed(2)}
            </Text>
        </View>
        <View style={[styles.balanceStatItem, styles.statDivider]} />
        <View style={styles.balanceStatItem}>
            <Text style={styles.balanceStatLabel}>Expenses</Text>
            <Text style={[styles.balanceStatAmount,{color:COLORS.expense}]}>
                -{currency}{Math.abs(parseFloat(summary.expenses)).toFixed(2)}
            </Text>
        </View>
      </View>
    </View>
  )
}

export default BalanceCard