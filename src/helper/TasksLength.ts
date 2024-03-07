import { Data } from "../context/DataProvider";

const taskLength = (boardItem:Data)=>{
    const completedTasks = boardItem && boardItem.tasks.length > 0 ? boardItem.tasks.filter((item)=>item.status === "done").length : 0;
    const totalTasks = boardItem && boardItem.tasks.length

    const progress = completedTasks ===0 ? 0 : completedTasks/totalTasks * 100

    return {completedTasks, totalTasks,progress}
}

export default taskLength;