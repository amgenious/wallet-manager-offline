import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, TouchableOpacity } from "react-native";
import { useTransactions } from "../hooks/useTransactions";

const DeleteProfileScreen = ({id}) => {
    const {deleteProfile} = useTransactions()
    const handleDelete = ()=>{
       Alert.alert(
        "Delete Profile",
        "Do you want to delete your profile?",
        [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'Yes', onPress: () => DeleteProfile(id) },
        ]
        );
        }
    const DeleteProfile = async(id)=>{
        await deleteProfile(id)
        router.push('/')
    } 
  return (
    <TouchableOpacity
    onPress={handleDelete}
    style={{backgroundColor:"red", padding:10, borderRadius:10,}}>
       <Ionicons name='trash-outline' size={20} color="white"/>
    </TouchableOpacity>
  )
}

export default DeleteProfileScreen