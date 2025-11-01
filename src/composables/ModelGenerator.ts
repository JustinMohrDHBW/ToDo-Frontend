import type { BuildingBlock, Category, CategoryCreationDto, ToDo, ToDoBuildingBlockDataDto, ToDoCreationDto } from "@/api"

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
        // name: name,
        categoryId: category.id,
        priority: priority,
        dueToday: dueToday,
        completed: false,
        buildingBlockData: buildingBlockData
    };

    return newTodo;
}