export function setItem(key: string, data:any) {
    sessionStorage.setItem(key, JSON.stringify(data))
}

export function getItem<T>(key: string) {
    const json = sessionStorage.getItem(key)
    if (json) return JSON.parse(json) as T
}