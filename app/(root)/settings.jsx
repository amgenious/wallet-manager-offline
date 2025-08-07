import { styles } from "@/assets/styles/home.styles.js";
import { COLORS } from "@/contants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import DeleteProfileScreen from "../../components/DeleteProfile";
import UpdateProfileScreen from "../../components/UpdateProfile";


export default function settings() {
   const { id } = useLocalSearchParams();
  return (
    <View style={styles.container}>
        <View style={{padding:10}}>
          <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>  
          <Text style={{fontSize:24,color:COLORS.text}}>Settings</Text>
           <TouchableOpacity onPress={() => router.navigate('/')}>
                <Ionicons name='home-outline' size={20} color={COLORS.primary}/>
            </TouchableOpacity>
          </View>
          <View style={{width:"100%", backgroundColor:"#ccc",height:1, marginVertical:10}}></View>
          <View style={{marginTop:10, marginBottom:10, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
          <Text style={{color:"white",fontSize:18, fontWeight:"medium"}}>Profile</Text>
            <DeleteProfileScreen id={id} />
          </View>
            <UpdateProfileScreen />
        </View>
    </View>
  )
}

