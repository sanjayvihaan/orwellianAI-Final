import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: name,
        password: password,
      }),
    };
    const data = await fetch(
      "http://localhost:8080/users/login",
      requestOptions
    ); //"https://orwellian-ai.onrender.com/users/login",
    const token_obj = await data.json();

    if (token_obj.msg) {
      alert(token_obj.msg);
    }
    const token = token_obj.token;
    console.log(token);

    if (token) {
      await AsyncStorage.setItem("userAuth", token);
      await AsyncStorage.setItem("userName", name);
      await AsyncStorage.setItem("userEmail", email);
      
      navigation.navigate("scan");
    }
    setLoading(false);
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#170e51" }}>
      <View style={style.container}>
        <TouchableOpacity onPress={() => navigation.navigate("scan")}>
          <Image
            source={require("../assets/logoicon.png")}
            style={style.logoImg}
          />
          <Text
            style={{
              color: "#eee",
              fontSize: 30,
              marginTop: 10,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <View style={style.form}>
          {/* Username  */}
          <Text style={style.label}>Username*</Text>
          <TextInput
            value={name}
            placeholder="username"
            placeholderTextColor="#e1e4e6"
            style={style.inputField}
            onChangeText={(value) => {
              return setName(value);
            }}
          />

          {/* email  */}
          <Text style={style.label}>Email*</Text>
          <TextInput
            value={email}
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor="#e1e4e6"
            style={style.inputField}
            onChangeText={(value) => {
              return setEmail(value);
            }}
          />

          {/* Password  */}
          <Text style={style.label}>Password*</Text>
          <TextInput
            value={password}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor="#e1e4e6"
            style={style.inputField}
            onChangeText={(value) => {
              return setPassword(value);
            }}
          />
          <TouchableOpacity onPress={() => login()}>
            <View style={style.btn}>
              <Text
                style={{ fontSize: 28, color: "white", textAlign: "center" }}
              >
                {isLoading ? (
                  <ActivityIndicator size="Large" color="#fff" />
                ) : (
                  "Login"
                )}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={style.switch}>
          <Text style={{ color: "#c8c2f1", fontSize: 20 }}>New here? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: "#19d87d", fontSize: 20 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#170e51",
    alignItems: "center",
    position: "relative",
  },
  logoImg: {
    marginTop: 80,
    width: 110,
    height: 110,
  },
  form: {
    width: "100%",
    paddingHorizontal: 27,
    marginTop: 16,
  },
  label: {
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
    paddingLeft: 10,
    marginBottom: 5,
    marginTop: 30,
  },
  inputField: {
    height: 60,
    fontSize: 20,
    color: "white",
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: "#3b3370",
    // margin: 10,
    borderRadius: 14,
    borderBottomWidth: 0.5,
    borderColor: "white",
  },
  btn: {
    backgroundColor: "#19d87d",
    height: 60,
    width: "100%",
    fontSize: 20,
    color: "white",
    marginTop: 36,
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 14,
  },
  switch: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default LoginPage;
