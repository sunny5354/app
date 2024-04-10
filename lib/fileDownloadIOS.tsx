import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";

export const downloadFromUrl = async (url: string, fileName: string) => {
    const { uri, headers } = await FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + fileName
    );
    save(uri);
};
const save = async (uri: string) => {
    shareAsync(uri);
};