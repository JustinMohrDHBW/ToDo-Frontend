import type { Priority } from "./models"

export const priorityArray: Priority[] = [{ name: "HIGH", priority: 3 }, { name: "MEDIUM", priority: 2 }, { name: "LOW", priority: 1 }]

export const filterMenu: string[] = ["Priority", "Name"]

export enum DataTypes {
    INTEGER = "INTEGER",
    DATE = "DATE",
    TEXT = "TEXT"
}

export enum DialogModes {
    CREATE = "Create",
    UPDATE = "Update",
    PUTBACK = "Put Back"
}