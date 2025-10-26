import type { BuildingBlock, Category } from "@/api"

export const toCategoryObject = (name:string, buildingBlocks:Array<BuildingBlock>, id?:number):Category => {

    return {
        id:id,
        name: name,
        buildingBlocks: buildingBlocks
    }

}
  