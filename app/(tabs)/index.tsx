import useAuthStore from "@/hooks/useAuth";
import { apiUrl } from "@/lib/url";
import axios from "axios";
import { Link, Stack, useFocusEffect } from "expo-router"; // Import useFocusEffect from expo-router
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { FAB, Text } from "react-native-paper";

const MyComponent = () => {
  const [dict, setDict] = useState([]);
  const { id } = useAuthStore();

  // Fetch data every time the component gains focus
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/dictionary/${id}`);
      const { dictionary } = res.data;
      setDict(dictionary);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <Link href={`/${item.id}`} asChild>
      <Pressable style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      </Pressable>
    </Link>
  );
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Stack.Screen
        options={{
          title: "Home",
        }}
      />
      <FlatList
        data={dict}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Link href={"/add"} asChild>
        <FAB
          style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
          icon="plus"
        />
      </Link>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
});

export default MyComponent;
