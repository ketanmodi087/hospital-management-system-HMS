export const shortenString = (str: string, characterCount: number) => {
    if (str.length > characterCount) {
        return str.substring(0, characterCount) + "...";
    }
    return str;
};