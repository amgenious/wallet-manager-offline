import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import ButtonMultiselect, { ButtonLayout, } from 'react-native-button-multiselect';
import { COLORS } from "../contants/colors";
import { useTransactions } from "../hooks/useTransactions";
router

const UpdateProfileScreen = () => {
const {updateProfile,profile, loadData } = useTransactions()
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

const[updatedName,setUpdatedName] = useState("")
const [selectedButtons, setSelectedButtons] = useState([]);
const[isLoading,setIsLoading] = useState(false)
  const handleButtonSelected = (selectedValues) => {
    setSelectedButtons(selectedValues);
  };
 const handleSaveProfile = () => {
    setIsLoading(true)
    const newname = updatedName === "" ? profile[0].name : updatedName;
    const currency = selectedButtons.length === 0 ? profile[0].currency : selectedButtons;
    setIsLoading(false)
      try{
          updateProfile(newname,currency,profile[0].id)
          router.push('/')
      }catch(e){
          console.log(e)
      }finally{
          setIsLoading(false)
      }
    }
useEffect(()=>{
loadData()
},[])
  return (
    <View>
     {
        profile[0] && (
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
               placeholder={profile[0].name} 
            placeholderTextColor={COLORS.textLight}
            value={updatedName}
            onChangeText={setUpdatedName}
            />
    </View> 
        )
     }   
        <Text style={{color:COLORS.text, fontSize:16, marginBottom:10}}>Update your currency</Text>
         <ButtonMultiselect
            layout={ButtonLayout.GRID} 
            buttons={CURRENCIES}
            selectedButtons={selectedButtons}
            onButtonSelected={handleButtonSelected}
            
            />
            <TouchableOpacity style={{width:"auto",padding:8, backgroundColor:COLORS.primary, borderRadius:10, marginTop:10}}
                onPress={handleSaveProfile}
            >
            {
                isLoading ? ( <Text style={{fontSize:18,paddingHorizontal:10, textAlign:"center"}}>Saving ...</Text>) : (
                <Text style={{fontSize:18,paddingHorizontal:10, textAlign:"center"}}>Update</Text>
                )
            }           
            </TouchableOpacity>    
    </View>
  )
}

export default UpdateProfileScreen