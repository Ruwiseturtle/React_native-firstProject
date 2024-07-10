

// ф-ція приймає шлях картинки з іменем картинки і вертає назву картинки
export const getFileName = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
}