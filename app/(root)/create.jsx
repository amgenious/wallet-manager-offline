import { Ionicons } from "@expo/vector-icons"
import { useRouter } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import { useState } from 'react'
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from '../../assets/styles/create.styles.js'
import { COLORS } from '../../contants/colors.js'


const CATEGORIES = [
    {id:"Food", name:"Food & Drinks", icon:"fast-food"},
    {id:"shopping", name:"Shopping", icon:"cart"},
    {id:"transportation",name:"Transportation", icon:"car"},
    {id:"entertainment", name:"Entertainment", icon:"film"},
    {id:"bills",name:'Income', icon:"cash"},
    {id:"other",name:"Other",icon:"ellipsis-horizontal"}
]


const Create = () => {
    const db = useSQLiteContext()
    const router = useRouter()
    const[title,setTitle] = useState("")
    const[amount,setAmount] = useState("")
    const[selectedCategory,setSelectedCategory] = useState("")
    const[isExpense,setIsExpense] = useState(true)
    const[isLoading,setIsLoading] = useState(false)

    const handleCreate = async()=>{
     
        if (!title.trim()) return Alert.alert("Error", "Please Enter a transaction title") 
        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0){
                Alert.alert("Error","Please enter a valid amount")
                return;
            } 
        if (!selectedCategory) return Alert.alert("Error", "Please select a category")
                
        setIsLoading(true)
            try{
            const formatedAmount = isExpense ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount))
            const response = await db.runAsync(`
            INSERT INTO transactions(title,amount,category)
            VALUES (? ,? , ?)`,[title,formatedAmount,selectedCategory])
         
            Alert.alert("Success", "Transaction created successfully")
            router.back()
        }catch(err){
            console.log(err)
            Alert.alert("Error", err.message || "Failed to create transaction")
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=> router.back()}>
            <Ionicons name='arrow-back' size={24} color={COLORS.primary}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
            New Transaction
        </Text>
        <TouchableOpacity style={[styles.saveButtonContainer, isLoading && styles.saveButtonDisabled]}
        onPress={handleCreate}
        disabled={isLoading}
        >
            <Text style={styles.saveButton}>{isLoading ? "Saving..." : "Save"}</Text>
            {
                !isLoading && <Ionicons name="checkmark" size={18} color={COLORS.primary}/>
            }
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
            <View style={styles.typeSelector}>
                <TouchableOpacity 
                style={[styles.typeButton, isExpense && styles.typeButtonActive]}
                onPress={()=>setIsExpense(true)}
                >
                    <Ionicons name='arrow-down-circle'
                    size={22}
                    color={isExpense ? COLORS.white : COLORS.expense}
                    style={styles.typeIcon}
                    />
                    <Text style={[styles.typeButtonText, 
                        isExpense && styles.typeButtonTextActive]}>Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
                onPress={()=>setIsExpense(false)}
                >
                    <Ionicons name='arrow-up-circle'
                    size={22}
                    color={!isExpense ? COLORS.white : COLORS.income}
                    style={styles.typeIcon}
                    />
                    <Text style={[styles.typeButtonText, 
                        !isExpense && styles.typeButtonTextActive]}>Income</Text>
                </TouchableOpacity>
            </View>
        <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput 
            style={styles.amountInput} 
            placeholder='0.00'
            placeholderTextColor={COLORS.textLight}
            value={amount}
            onChangeText={setAmount}
            keyboardType='numeric'
            />
        </View> 
        <View style={styles.inputContainer}>
            <Ionicons 
            name='create-outline'
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
            />
            <TextInput 
            style={styles.input}
            placeholder="Transaction Title"
            placeholderTextColor={COLORS.textLight}
            value={title}
            onChangeText={setTitle}
            />
        </View> 
        <Text style={styles.sectionTitle}>
            <Ionicons name='pricetag-outline' size={16} color={COLORS.text}/> Category
        </Text>
        <View style={styles.categoryGrid}>
           {
            CATEGORIES.map(category => (
               <TouchableOpacity
               key={category.id}
               style={[
                styles.categoryButton,
                selectedCategory === category.name && styles.categoryButtonActive
               ]}
               onPress={() => setSelectedCategory(category.name)}
               >
                    <Ionicons 
                    name={category.icon}
                    size={20}
                    color={selectedCategory === category.name ? COLORS.white : COLORS.text}
                    style={styles.categoryIcon}
                    />
                    <Text
                    style={[
                        styles.categoryButtonText,
                        selectedCategory === category.name && styles.categoryButtonTextActive,
                    ]}
                    >{category.name}</Text>
               </TouchableOpacity> 
            ))
           } 
        </View>
      </View>
      {
        isLoading && (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={"large"} color={COLORS.primary}/>
            </View>
        )
      }
    </View>
  )
}

export default Create