import React from 'react';
import { Button } from "react-native";

export default function CustomButton({ changeText, text, color }) {
    const clickEvent = () => {
        changeText(text);
    }

    return (
        <Button
            onPress={clickEvent}
            title={text}
            color={color}
        />
    );
}