import { View, ActivityIndicator } from 'react-native'
import {COLORS} from "../contants/colors"
import {styles} from "@/assets/styles/home.styles.js"

const PageLoaderPage = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={'large'} color={COLORS.primary}/>
    </View>
  )
}

export default PageLoaderPage; 