import type { BuildingBlock, Category, CategoryCreationDto } from "@/api"

export const toCategoryCreationObject = (name:string, buildingBlockIds:Array<number>):CategoryCreationDto => {

    return {
        name: name,
        buildingBlockIds: buildingBlockIds
    }
}

export const toCategoryObject = (name:string, buildingBlocks:Array<BuildingBlock>, id:number):Category => {

    return {
        id: id,
        name: name,
        buildingBlocks: buildingBlocks
    }
}