import type { Priority } from "./models"

export const priorityArray: Array<Priority> = [{ name: "HIGH", priority: 3 }, { name: "MEDIUM", priority: 2 }, { name: "LOW", priority: 1 }]

export const filterMenu: Array<string> = ["Priority", "Name"]

export enum DataTypes {
    INTEGER = "INTEGER",
    DATE = "DATE",
    TEXT = "TEXT"
}