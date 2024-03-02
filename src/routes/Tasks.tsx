import React from 'react'
import SideBar from '../components/SideBar'
import TaskList from '../components/TaskLists'

const Tasks = () => {
  return (
    <div className='flex flex-row'>
        <SideBar/>
        <TaskList/>
    </div>
  )
}

export default Tasks