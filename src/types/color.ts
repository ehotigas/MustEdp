export enum Color {
    Base = "#48757A",
    Conservador = "#E49230",
    Adverso = "#DF6A41",
    Critico = "#332D38",
    Default = "#455558"
}

export const getColor = (key: string) => {
    return Color[key as keyof typeof Color] === undefined ? Color.Default : Color[key as keyof typeof Color];
}