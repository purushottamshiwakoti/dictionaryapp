import { View, Text, StyleSheet, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useNavigation, usePathname } from "expo-router";
import axios from "axios";
import { apiUrl } from "@/lib/url";
import { Button } from "react-native-paper";

const ViewDetails = () => {
  const params = usePathname();
  const [dict, setDict] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/get-dictionary${params}`);
      const { dictionary } = res.data;
      setDict(dictionary);
    } catch (error) {
      console.log(error);
    }
  };
  const navigation = useNavigation();
  const onDelete = async () => {
    try {
      const res = await axios.delete(`${apiUrl}/get-dictionary${params}`);
      alert("Successfully deleted dictionary");
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            // Put your delete logic here
            onDelete();
            // Call your delete function here
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Details",
        }}
      />
      {dict.length > 0 ? (
        <>
          <View style={styles.card}>
            <Image
              source={{
                uri: dict[0].image,
              }}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{dict[0].title}</Text>
              <Text>{dict[0].description}</Text>
            </View>
          </View>
          <Button
            style={{
              marginTop: 10,
            }}
            mode="outlined"
            color="red"
            onPress={handleDelete}
          >
            Delete
          </Button>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
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
  cardImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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

export default ViewDetails;
