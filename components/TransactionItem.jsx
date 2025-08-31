import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/style/home.styles";
import { COLORS } from "../assets/constants/colors";
import { formatDate } from "../lib/untils"

const CATEGORY_ICONS = {
    food: "fast-food",
    shopping: "cart",
    transportation: "car",
    entertainment: "film",
    bills: "receipt",
    income: "cash",
    other: "ellipsis-horizontal",
};

export const TransactionItem = ({ item, onDelete }) => {
    const isIncome = item.type === "income";

    const iconName = CATEGORY_ICONS[item.category] || "pricetag-outline";

    const displayDate = item.timestamp || item.created_at;

    return (
        <View style={styles.transactionCard}>
            <View style={styles.transactionContent}>
                <View style={styles.categoryIconContainer}>
                    <Ionicons name={iconName} size={22} color={isIncome ? COLORS.income : COLORS.expense} />
                </View>

                <View style={styles.transactionLeft}>
                    <Text style={styles.transactionTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.transactionCategory}>{item.category}</Text>
                </View>

                <View style={styles.transactionRight}>
                    <Text
                        style={[styles.transactionAmount, { color: isIncome ? COLORS.income : COLORS.expense }]}
                    >
                        {isIncome ? "+ " : "-"}${Math.abs(parseFloat(item.amount)).toFixed(2)}
                    </Text>
                    {displayDate && <Text style={styles.transactionDate}>{formatDate(displayDate)}</Text>}
                </View>
            </View>

            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
                <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
            </TouchableOpacity>
        </View>
    );
};