import React, { useState } from "react"
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { TaskPreview } from "./task-preview"
import { GroupTitle } from "./group-title"
import { AddTask } from "./add-task"

export const Group = ({ group, onAddTask, onArchiveTask, onArchiveGroup, onGroupChange, idx }) => {
    // console.log('Group - onArchiveGroup', onArchiveGroup)
    const { tasks } = group
    const [newTask, setNewTask] = useState({ title: '', groupId: group.id })
    const handleChange = ({ target }) => {
        const { value, name } = target
        setNewTask(prevState => ({ ...prevState, [name]: value }))
    }

    const [groupTitle, setGroupTitle] = useState({ txt: group.title, groupId: group.id })
    const [isTaskOpen, setIsTaskOpen] = useState(false)

    return <Draggable type="groups" draggableId={group.id} index={idx}>
        {(provided, snapshot) => {
            const style = {
                transform: snapshot.isDragging ? 'transform: rotateZ(3deg);' : 'transform: rotateZ(0deg);',
                ...provided.draggableProps.style,
            }
            return <section
                // onClick={ev => ev.stopPropagation()}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`group flex col`}
            // onBlur={ev => setIsTaskOpen(prevState => false)}
            >
                <GroupTitle
                    //Group header is just a textarea with two way data binding
                    groupInfo={groupTitle}
                    setGroupTitle={setGroupTitle}
                    onArchiveGroup={onArchiveGroup}
                    onGroupChange={onGroupChange}
                />
                <Droppable type="cards" droppableId={`${group.id}`} direction="vertical">
                    {(provided, snapshot) => {
                        return <div className="list-task" {...provided.droppableProps} ref={provided.innerRef}>
                            {tasks.map((task, idx) => {
                                if (!task.archivedAt) return <TaskPreview key={task.id} task={task} groupId={group.id} idx={idx} />
                            })}
                            {isTaskOpen && <AddTask
                                // a card with the same class as the the others but with a textarea
                                group={group}
                                onAddTask={onAddTask}
                                handleChange={handleChange}
                                newTask={newTask}
                                setNewTask={setNewTask}
                            />}
                            {snapshot.isDraggingOver && provided.placeholder}
                            {
                                isTaskOpen || <div className="group-footer flex space-between align-center">
                                    <button className="add-card-btn" onClick={ev => setIsTaskOpen(true)
                                    }>Add a card</button>
                                </div>
                            }
                            {
                                isTaskOpen && <div className="group-footer flex align-center">
                                    <button onMouseDown={ev => {
                                        onAddTask(newTask)
                                        setNewTask({ title: '', groupId: group.id })
                                    }}>Add card</button>
                                    <button onClick={ev => setIsTaskOpen(false)}>X</button>
                                </div>
                            }
                        </div>

                    }}
                </Droppable>


            </section >
        }}

    </Draggable >

}