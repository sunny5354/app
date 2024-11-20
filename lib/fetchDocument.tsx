import * as DocumentPicker from "expo-document-picker";

// Documet Picker

export const fetchDocument = async (type: string[]) => {
    const result = await DocumentPicker.getDocumentAsync({
        type: type,
        // type: ["application/pdf", "image/jpeg", "image/png", "*/*"],
    });
    return result;
};