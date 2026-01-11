export const formatLink = (url: string) => {
    if (!url) return "#"; // Return a safe value for empty links
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
};