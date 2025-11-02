import type { BuildingBlock, Category, CategoryCreationDto, LinkUpdateDto, ToDo, ToDoBuildingBlockDataDto, ToDoCreationDto, ToDoUpdateLinkDataDto } from "@/api"

export const toCategoryCreationObject = (name: string, buildingBlockIds: number[]): CategoryCreationDto => {

    return {
        name: name,
        buildingBlockIds: buildingBlockIds
    }
}

export const toCategoryObject = (name: string, buildingBlocks: BuildingBlock[], id: number): Category => {

    return {
        id: id,
        name: name,
        buildingBlocks: buildingBlocks
    }
}


export const toTodoCreationObject = (
    name: string,
    priority: string,
    dueToday: boolean,
    category: Category,
    buildingBlockValues: Record<number, string>
): ToDoCreationDto => {

    const buildingBlockData = Object.entries(buildingBlockValues).map(([id, val]) => {
        return {
            buildingBlockId: Number(id),
            dataValue: val
        } as ToDoBuildingBlockDataDto;
    });

    const newTodo: ToDoCreationDto = {
        title: name,
        categoryId: category.id,
        priority: priority,
        dueToday: dueToday,
        completed: false,
        buildingBlockData: buildingBlockData
    };

    return newTodo;
}



export const toLinkDataDtoObject = (
    title:string,
    priority:string,
    doToday:boolean,
    buildingBlockData:LinkUpdateDto[]
):ToDoUpdateLinkDataDto => {

    const updateLinkDataDto:ToDoUpdateLinkDataDto = {
        priority: priority,
        doToday: doToday,
        // title: updateData.title,
        buildingBlockData: buildingBlockData.map(block => ({
            buildingBlockId: block.buildingBlockId,
            dataValue: block.dataValue
        }))
    }

    return updateLinkDataDto

}