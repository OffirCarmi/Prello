import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom"
import { TaskLabels } from "../task-preview/task-labels"
import { TaskMembers } from "../task-preview/task-members"
import { boardService } from "../../services/board/board.service"
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { TaskBadges } from '../task-preview/task-badges';



export const TaskPreview = ({ task, groupId, idx }) => {
    const params = useParams()
    const { boardId } = params

    const [membersToDisplay, setMembersToDisplay] = useState(null)

    useEffect(() => {
        getMembersToDisplay()

    }, [])


    const getMembersToDisplay = async () => {
        const members = await boardService.getMembers()
        if (!task.members) task.members = []
        const filteredMembers = members.filter(member => task.members.includes(member._id))
        setMembersToDisplay(filteredMembers)
    }

    return <Draggable type="cards" draggableId={task.id} index={idx}>
        {(provided, snapshot) => {
            return <article className="task-preview"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={_getStyle(provided.draggableProps.style, snapshot)}
            >
                <Link to={`/board/${boardId}/${groupId}/${task.id}`}>
                    {task.style?.bgColor && <section className="task-color"
                        style={({ backgroundColor: task.style.bgColor })}
                    ></section>}
                    <div className="task-info">
                        {task.labels?.length > 0 && <div className="task-label">
                            <TaskLabels labels={task.labels} />
                        </div>}
                        <section className="task-title">{task.title}</section>
                        <section className="task-status flex space-between wrap">
                            <TaskBadges task={task} />
                            {membersToDisplay?.length > 0 && <section className="members flex">
                                <TaskMembers members={membersToDisplay} />
                            </section>}
                        </section>
                    </div>
                </Link>
            </article>
        }}
    </Draggable>

}

function _getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
        return style
    }
    const { moveTo, curve, duration } = snapshot.dropAnimation;
    // move to the right spot
    const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
    // add a rotate
    // const rotate = `rotate(15deg)`

    // patching the existing style
    return {
        ...style,
        transform: `${translate}`,
        // slowing down the drop because we can
        transition: `all ${curve} ${0.01}s`,
    };
}

// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from "react-router-dom"
// import { boardService } from "../../services/board/board.service"

// import { TaskLabels } from "../task-preview/task-labels"


// export const TaskPreview = ({ task, groupId, onArchiveTask }) => {
//     const [membersToDisplay, setMembersToDisplay] = useState(null)

//     useEffect(() => {
//         setMembersToDisplay(getMembersToDisplay())

//     }, [membersToDisplay])

//     // console.log(task);
//     const params = useParams()
//     const { boardId, taskId } = params

//     async function getMembersToDisplay() {
//         const members = await boardService.getMembers()
//         return members.filter(member => task.members.includes(member._id))
//     }




//     // if (!task) return <p>Loading...</p>
//     return <article className="task-preview">
//         <Link to={`/board/${boardId}/${groupId}/${taskId}`}>
//             {task.style?.bgColor && <section className="task-color"
//             // style={({ backgroundColor: task.style.bgColor })}
//             ></section>}
//             <div className="task-info">
//                 {task.labels && task.labels.length > 0 && <div className="task-label">
//                     <TaskLabels labels={task.labels} />
//                 </div>}
//                 <section className="task-title">{task.title}</section>
//                 <section className="task-status flex space-between wrap">
//                     <section className="badges">badges</section>
//                     {/* {task.members && task.members.length > 0 && <section className="members">
//                         <TaskPreview members={() => membersToDisplay()} />
//                     </section>} */}
//                     {/* {task.members && task.members.length > 0 && <section className="members">
//                         <TaskPreview members={membersToDisplay} />
//                     </section>} */}
//                 </section>
//             </div>
//         </Link>
//     </article>
// }