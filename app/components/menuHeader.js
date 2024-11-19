import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native"; // Import Text
import { Menu, Divider, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const MenuHeader = () => {
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();

    const openMenu = () => {
        if (!visible) { // Only open if currently not visible
            console.log("Opening menu");
            setVisible(true);
        }
    };

    const closeMenu = () => {
        if (visible) { // Only close if currently visible
            console.log("Closing menu");
            setVisible(false);
        }
    };

    const logout = () => {
        navigation.navigate("Login");
        closeMenu();
    };

    return (
        <View style={styles.container}>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <Button
                        mode="text"
                        onPress={openMenu}
                        contentStyle={{ flexDirection: "row-reverse" }} // Adjusts icon position
                    >
                        <Text style={styles.buttonText}>Menu</Text> {/* Wrap text in <Text> */}
                    </Button>
                }
            >
                <Menu.Item onPress={logout} title="Log Out" />
                <Divider />
                <Menu.Item onPress={closeMenu} title="Other Option" />
            </Menu>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff", // Ensure text is visible if the button has a dark background
    },
});

export default MenuHeader;
