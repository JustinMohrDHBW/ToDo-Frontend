import type { BuildingBlock } from "@/api"

export const categoryNameMapper = (name:string) => {

    switch(name) {
        case 'DESCRIPTION':
          return 'Description'

        case 'DEADLINE':
            return 'Deadline'

        case 'LINK':
          return 'Link'

        case 'ESTIMATED_TIME_MINUTES':
            return 'Estimated Time In Minutes'

        default:
            console.log(name)
            return name

      } 

}


export const isBuildingBlockInput = (id:number, buildingBlocks: BuildingBlock[]) => {
    const dataType = findBuildingBlockById(id, buildingBlocks)
    if(dataType === "TEXT"){
        return true;
    }
    return false
}

export const isBuildingBlockDate = (id:number, buildingBlocks: BuildingBlock[]) => {
    const dataType = findBuildingBlockById(id, buildingBlocks)
    if(dataType === "DATE"){
        return true;
    }
    return false
}

export const isBuildingBlockNumber = (id:number, buildingBlocks: BuildingBlock[]) => {
    const dataType = findBuildingBlockById(id, buildingBlocks)
    if(dataType === "INTEGER"){
        return true;
    }
    return false
}




const findBuildingBlockById = (id:number, buildingBlocks: BuildingBlock[]) => {
    return buildingBlocks.find(buildingBlock => buildingBlock.id == id)?.dataType
}