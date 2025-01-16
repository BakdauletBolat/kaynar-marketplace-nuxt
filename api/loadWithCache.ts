import type {AxiosInstance} from "axios";

interface CacheData {
    data: object;
    expireDate: Date;
}


function addDays(date: Date, daysToAdd: number) {
    let newDate = new Date(date); // Create a copy of the input date to avoid modifying the original
    newDate.setDate(newDate.getDate() + daysToAdd); // Add the days
    return newDate;
}

export function saveCacheData(key: string,
                              data: object,
                              expireDate: Date = addDays(new Date(), 1)) {
    localStorage.setItem(key,
        JSON.stringify({
            data: data,
            expireDate: expireDate,
        }));
}

export async function loadWithCache(axiosInstance: AxiosInstance, url: string) {

    const cachedObjectString = localStorage.getItem(url);

    if (cachedObjectString !== null) {
        const cachedObject = JSON.parse(cachedObjectString);
        if (new Date(Date.parse(cachedObject.expireDate)) > new Date())
            return {
                data: cachedObject.data
            }
    }

    const data = await axiosInstance.get(url)
    saveCacheData(url, data.data)
    return data;
}