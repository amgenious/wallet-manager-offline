import { styles } from "@/assets/styles/home.styles.js";
import { Text, View } from "react-native";
import { COLORS } from "../../contants/colors";


export default function settings() {
  return (
    <View style={styles.container}>
        <View style={{padding:10}}>
      <Text style={{fontSize:18,color:COLORS.text}}>Settings</Text>
        </View>
    </View>
  )
}

