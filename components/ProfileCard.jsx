import { styles } from "@/assets/styles/home.styles.js";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ButtonMultiselect, { ButtonLayout, } from 'react-native-button-multiselect';
import { COLORS } from "../contants/colors";
import { useTransactions } from "../hooks/useTransactions";

const ProfileCard = () => {
const {createProfile,loadData } = useTransactions()
const CURRENCIES = [
      { label: "Dollar", value: "$" },
      { label: "Euro (EUR)", value: "€" },
      { label: "British Pound (GBP)", value: "£" },
      { label: "Nigerian Naira (NGN)", value: "₦" },
      { label: "Ghanaian Cedi (GHS)", value: "₵" },
      { label: "Indian Rupee (INR)", value: "₹" },
      { label: "Swiss Franc (CHF)", value: "CHF" },
      { label: "Chinese Yuan (CNY)", value: "¥" },
    ]
const[name,setName] = useState("")
const [selectedButtons, setSelectedButtons] = useState([]);
const[isLoading,setIsLoading] = useState(false)

  const handleButtonSelected = (selectedValues) => {
    setSelectedButtons(selectedValues);
  };
  const handleSaveProfile = () => {
    if (!selectedButtons) return Alert.alert("Error", "Please select a currency")
    if (!name.trim()) return Alert.alert("Error", "Please provide a name")
    setIsLoading(true)
    try{
        createProfile(name,selectedButtons)
        loadData()
    }catch(e){
        console.log(e)
    }finally{
        setIsLoading(false)
    }
  }
  return (
    <View style={styles.container}>
        <View style={{padding:10}}>
      <Text style={{color:COLORS.text, fontSize:24, textAlign:"center",fontWeight:"black"}}>Profile</Text>
      <Text style={{color:COLORS.text, textAlign:"center",marginTop:20,fontSize:16}}>Create a profile</Text>
     
        <View style={{
             flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    backgroundColor: COLORS.background,
    marginTop:30
        }}>
            <Ionicons 
            name='person-circle-outline'
            size={22}
            color={COLORS.textLight}
            style={{ marginHorizontal: 12}}
            />
            <TextInput 
            style={{ flex: 1,
                padding: 12,
                fontSize: 16,
                color: COLORS.text,}}
            placeholder="Name"
            placeholderTextColor={COLORS.textLight}
            value={name}
            onChangeText={setName}
            />
        </View> 
        <Text style={{color:COLORS.text, fontSize:16, marginBottom:10}}>Select your currency</Text>
         <ButtonMultiselect
            layout={ButtonLayout.GRID} 
            buttons={CURRENCIES}
            selectedButtons={selectedButtons}
            onButtonSelected={handleButtonSelected}
            />
            <View style={{flexDirection:"column", justifyContent:"center",alignItems:"center", marginTop:20}}>
            <TouchableOpacity style={{width:"auto",padding:8, backgroundColor:COLORS.primary, borderRadius:10}}
            onPress={handleSaveProfile}
            >
               {
                 isLoading ? ( <Text style={{fontSize:18,paddingHorizontal:10}}>Saving ...</Text>) : (
                     <Text style={{fontSize:18,paddingHorizontal:10}}>Save</Text>
                 )
               }
               
            </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default ProfileCard