export function capitalizeString(str: string): string {
    return str.toLowerCase().replace(/(^|\s)\S/g, function (char) {
        return char.toUpperCase();
    });
}
