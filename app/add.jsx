import React, { useState, useEffect } from "react";
import { View, Image, Button } from "react-native";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import useAuthStore from "@/hooks/useAuth";
import { useNavigation, useRouter } from "expo-router";
import { apiUrl } from "@/lib/url";

const Index = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const { id } = useAuthStore();

  const router = useRouter();
  const navigation = useNavigation();
  const handleSave = async () => {
    try {
      const res = await axios.post(`${apiUrl}/dictionary`, {
        title,
        description,
        image,
        userId: id,
      });
      console.log(res);
      alert("Successfully added dictionary");
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      convertToBase64(result.assets[0].uri);
    }
  };

  const convertToBase64 = async (uri) => {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    setBase64Image(base64);
  };

  console.log(base64Image);
  return (
    <View style={{ padding: 10 }}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        mode="outlined"
      />
      <TextInput
        style={{
          marginVertical: 10,
          minHeight: 300,
          textAlignVertical: "top",
          padding: 10,
          borderWidth: 1,
          borderColor: "gray",
        }}
        label="Description"
        value={description}
        numberOfLines={10}
        onChangeText={(text) => setDescription(text)}
        mode="outlined"
      />
      {image ? (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      ) : (
        <Button title="Select Image" onPress={selectImage} />
      )}

      <View style={{ marginTop: 10 }}>
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
};

export default Index;
