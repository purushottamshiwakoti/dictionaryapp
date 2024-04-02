import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper"; // Import TextInput from react-native-paper
import useAuthStore from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas";
import { Link, Stack, useNavigation, useRouter } from "expo-router";
import { apiUrl } from "@/lib/url";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { setUserName, setId } = useAuthStore();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    const { email, password, fullName } = data;
    console.log(email, password, fullName);

    try {
      setLoading(true);
      const res = await axios.post(`${apiUrl}/register`, {
        email: email,
        password: password,
        fullName: fullName,
      });

      console.log("Signup successful:", res.data);
      const { message, user } = res.data;
      setId(user.id);
      setUserName(user.fullName);

      router.push("/(tabs)");

      // Handle success response here
    } catch (error) {
      console.log(error);

      // Handle error response here
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack.Screen
        options={{
          title: "Register",
        }}
      />
      <Text
        variant="headlineMedium"
        style={{
          fontWeight: "700",
          textTransform: "capitalize",
        }}
      >
        Create a new account
      </Text>
      <View style={{ width: "95%", marginTop: 10 }}>
        {/* Adjust the width as needed */}

        <Controller
          control={control}
          name={"fullName"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            // <TextInput

            <>
              <TextInput
                label="Full Name"
                placeholder="Enter your full name here"
                value={value}
                style={{
                  width: "100%",
                  borderRadius: 20,
                }}
                mode="outlined"
                onChangeText={onChange}
                onBlur={onBlur}
              />
              {error && (
                <Text style={{ color: "red", marginTop: 4 }}>
                  {error.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name={"email"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            // <TextInput

            <>
              <TextInput
                label="Email"
                placeholder="Enter your email address here"
                value={value}
                style={{
                  width: "100%",
                  borderRadius: 20,
                  marginTop: 10,
                }}
                keyboardType="email-address"
                mode="outlined"
                onChangeText={onChange}
                onBlur={onBlur}
              />
              {error && (
                <Text style={{ color: "red", marginTop: 4 }}>
                  {error.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name={"password"}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                label="Password"
                placeholder="Enter your password here"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={{
                  width: "100%",
                  borderRadius: 20,
                  marginTop: 10,
                }}
                secureTextEntry
                mode="outlined"
              />
              {error && (
                <Text style={{ color: "red", marginTop: 4 }}>
                  {error.message}
                </Text>
              )}
            </>
          )}
        />

        <Button
          icon="logout"
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={{
            marginTop: 20,
            height: 50,
            marginLeft: 0,
            marginRight: 0,
            justifyContent: "center",
          }}
          disabled={isLoading}
        >
          Register
        </Button>
        <View
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <Text
            variant="bodyMedium"
            style={{
              textAlign: "right",
            }}
          >
            Already have an account
          </Text>
          <TouchableOpacity
            style={{ marginLeft: 3 }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{}}>Login Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
