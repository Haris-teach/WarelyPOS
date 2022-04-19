import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import userLogo from "../assets/Logo.jpg";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Image,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
export function DrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              {/* <Image
                source={require("../assets/Logo.jpg")}
                style={{ width: "40%", height: 55 }}
              ></Image> */}
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="HOME"
              labelStyle={{
                color: "black",
                fontWeight: "bold",
                alignSelf: "center",
                borderColor: "black",
                width: 220,
                borderWidth: 2,
                padding: 13,
              }}
              onPress={() => alert("Profile")}
            />
            <DrawerItem
              label="SALE HISTORY"
              labelStyle={{
                color: "black",
                fontWeight: "bold",
                alignSelf: "center",
                borderColor: "black",
                width: 220,
                borderWidth: 2,
                padding: 13,
              }}
              onPress={() => alert("Manage Documents ")}
            />
            <DrawerItem
              label="SHIFT"
              labelStyle={{
                color: "black",
                fontWeight: "bold",
                alignSelf: "center",
                borderColor: "black",
                width: 220,
                borderWidth: 2,
                padding: 13,
              }}
              onPress={() => alert("Your Trips")}
            />
            <DrawerItem
              label="SETTING"
              labelStyle={{
                color: "black",
                fontWeight: "bold",
                alignSelf: "center",
                borderColor: "black",
                width: 220,
                borderWidth: 2,
                padding: 13,
              }}
              onPress={() => alert("Payment")}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          label="OPEN DRAWER"
          labelStyle={{
            color: "black",
            fontWeight: "bold",
            alignSelf: "center",
            justifyContent: "center",
            borderColor: "black",
            width: 220,
            borderWidth: 2,
            padding: 10,
          }}
          onPress={() => alert("Logout Press")}
        />
        <DrawerItem
          label="Close sale"
          labelStyle={{
            color: "white",
            fontWeight: "bold",
            alignSelf: "center",
            height: 30,

            padding: 10,
          }}
          onPress={() => alert("Logout Press")}
          style={{ backgroundColor: "#c90809" }}
        />
      </Drawer.Section>
    </View>
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: { marginTop: 15 },
  bottomDrawerSection: {
    marginBottom: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
