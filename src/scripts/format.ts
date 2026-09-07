const msPerSecond = 1000;
const secondsPerMinute = 60;
const minutesPerHour = 60;
const hoursPerDay = 24;

export const formatDate = (date: Date): string =>
    date.toLocaleDateString("de-de", {year: "numeric", month: "long", day: "2-digit", timeZone: "Europe/Berlin"});

export const formatDuration = (millis: number): string => {
    if (millis < msPerSecond) return "unter einer Sekunde";
    const days = Math.floor(millis / (msPerSecond * secondsPerMinute * minutesPerHour * hoursPerDay));
    if (days >= 1) return `${days} ${days === 1 ? "Tag" : "Tage"}`;
    const hours = Math.floor(millis / (msPerSecond * secondsPerMinute * minutesPerHour));
    if (hours >= 1) return `${hours} ${hours === 1 ? "Stunde" : "Stunden"}`;
    const minutes = Math.floor(millis / (msPerSecond * secondsPerMinute));
    if (minutes >= 1) return `${minutes} ${minutes === 1 ? "Minute" : "Minuten"}`;
    const seconds = Math.floor(millis / msPerSecond);
    return `${seconds} ${seconds === 1 ? "Sekunde" : "Sekunden"}`;
};

export const formatFileSize = (bytes: number, decimals = 2): string => {
    const units = ["B", "KiB", "MiB", "GiB", "TiB"];
    const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const value = Number((bytes / 1024 ** unitIndex).toFixed(decimals));
    return `${value} ${units[unitIndex]}`;
};
