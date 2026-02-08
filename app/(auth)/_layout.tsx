import React from "react";
import { Stack } from "expo-router";
import { ImageBackground, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function AuthLayout() {
  return (
    <ImageBackground
      source={{
        uri:"https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=2074&auto=format&fit=crop",
      }}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.6)"]}
        style={{ flex: 1 }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "transparent" },
          }}
        />
      </LinearGradient>
    </ImageBackground>
  );
}
