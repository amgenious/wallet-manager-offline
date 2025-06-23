import { styles } from "@/assets/styles/home.styles.js"
import { Ionicons } from '@expo/vector-icons'
import { Alert, TouchableOpacity } from 'react-native'
import { COLORS } from '../contants/colors'

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  // const { signOut } = useClerk()
  const handleSignOut = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?",[
      {text:"Cancel",style:"cancel"},
      {text:"Logout",style:"destructive",onPress:()=> {console.log("Out")}},
    ])
  }
  return (
    <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
      <Ionicons name='log-out-outline' size={22} color={COLORS.text}/>
    </TouchableOpacity>
  )
}