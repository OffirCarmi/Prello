import React, { useEffect, useState } from 'react'

import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector, useDispatch } from 'react-redux'

// CMPS
import { MembersPreview } from "../cmps/task-details/body/members-preview"
import { ChecklistList } from '../cmps/task-details/checklist/checklistList.jsx'
import { AttachmentList } from '../cmps/task-details/attachments/attachment-list.jsx'
import { IDescription } from '../cmps/icons/i-description'

// ACTIONS
import { updateBoard } from '../store/board/board.action'

// SERVICES
import { utilService } from '../services/basic/util.service.js'
import { IAdd } from '../cmps/icons/i-add.jsx'

// LIBS

import TextareaAutosize from '@mui/material/TextareaAutosize'
import { DetailsHeader } from '../cmps/task-details/body/details-header.jsx'
import { TaskEdit } from '../cmps/task-details/body/task-edit.jsx'

export default function EmptyTextarea() {
    return (
        <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Empty"
            style={{ width: 200 }}
        />
    )
}

export const TaskDetails = ({ onArchiveTask, onSaveBoard }) => {
    //getter hooks
    const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const { board } = useSelector(storeState => storeState.boardModule)

    //state hooks
    const [newBoard, setNewBoard] = useState(board)
    const [group, setGroup] = useState(null)
    const [task, setTask] = useState(null)
    const [isModal, setIsModal] = useState('')
    const [modalType, setModalType] = useState(null)
    const [isTitleEditable, setTitle] = useState(null)
    const [isDescriptionEditable, setDescriptionEditable] = useState(null)
    const [description, setDescriptionValue] = useState('')


    const { boardId, groupId, taskId } = params
    const descriptionRef = React.useRef()

    useEffect(() => {
        onLoad()
    }, [])


    const onGoBack = () => {
        history.push(`/board/${boardId}`)
    }

    const closeModal = () => {
        setModalType(null)
    }

    function onLoad() {
        const board = deepCloneBoard()
        setNewBoard(board)
        const groupToAdd = board.groups.find(group => group.id === groupId)
        setGroup(groupToAdd)
        const task = groupToAdd.tasks.find(task => task.id === taskId)
        setTask(task)
        // const group = board.groups.find(group => groupId === group.id)
        // const task = group.tasks.find(task => taskId === task.id)
        // setTask(task)
    }

    const handleDescriptionChange = ({ target }) => {
        setDescriptionValue(target.value)
    }

    const saveMembers = (updatedTask) => {
        const group = board.groups.find(group => group.id === groupId)
        const idx = group.tasks.findIndex(task => task.id === updatedTask.id)
        group.tasks[idx].members = updatedTask.members
        setGroup(group)
        saveBoard()
    }

    const saveLabels = (updatedTask) => {
        const group = newBoard.groups.find(group => group.id === groupId)
        const idx = group.tasks.findIndex(task => task.id === updatedTask.id)
        group.tasks[idx].members = updatedTask.members
        setGroup(group)
        saveBoard()
    }

    const saveChecklist = (checklistTitle) => {
        const newChecklist = {
            title: checklistTitle,
            items: [],
            id: 'Cl' + utilService.makeId()
        }

        if (task.checklist) {
            task.checklist.push(newChecklist)
        } else {
            task.checklist = [newChecklist]
        }
        setGroup(group)
        saveBoard()
    }

    const onSaveChecklistTask = (txt, clTaskId) => {
        const newItem = {
            txt,
            id: utilService.makeId(),
            isDone: false
        }

        const checklistTask = task.checklist.find(clTask => clTask.id === clTaskId)
        checklistTask.items.push(newItem)
        saveBoard()
    }

    const saveTaskTitle = (title) => {
        task.title = title
        setTitle(false)
        saveBoard()
    }

    const saveTaskDescription = () => {
        task.description = description
        setDescriptionEditable(false)
        saveBoard()

    }

    const onSaveAttachment = (attachment) => {
        if (attachment.id) {
            const requestedAttachmentIdx = task.attachments.findIndex(requestedAttachment => requestedAttachment.id === attachment.id)
            task.attachments.splice(requestedAttachmentIdx, 1, attachment)
        } else {

            attachment.createdAt = Date.now()
            attachment.id = utilService.makeId()
            if (task.attachments) {
                task.attachments.push(attachment)
            } else {
                task.attachments = [attachment]
            }
        }
        saveBoard()
    }

    const saveBoard = () => {
        dispatch(updateBoard(newBoard))
    }

    // const saveBoard = () => {
    //     onSaveBoard(newBoard)
    // }

    const deepCloneBoard = () => {
        return JSON.parse(JSON.stringify(board))
    }

    const onSetIsDone = (checklistId, clTaskItem) => {
        saveBoard()
    }

    const onDeleteClTask = (clTaskId, item) => {
        const clTaskIdx = item.items.findIndex(clTask => clTask.id === clTaskId)
        item.items.splice(clTaskIdx, 1)
        saveBoard()
    }

    const saveMemberToClTask = (member, clTaskId, checklist) => {

        const requestedClTask = checklist.items.find(clTask => clTask.id === clTaskId)
        if (requestedClTask.member) {
            if (requestedClTask.member._id === member._id) {
                requestedClTask.member = false
            } else requestedClTask.member = member
        } else {
            requestedClTask.member = member
        }
        saveBoard()
    }

    const onDeleteChecklist = (checklistId) => {
        const { checklist } = task
        const requestedChecklistIdx = checklist.findIndex(checklist => checklist.id === checklistId)
        checklist.splice(requestedChecklistIdx, 1)
        saveBoard()

    }

    const toggleEditDescription = () => {
        if (isDescriptionEditable) {
            setDescriptionEditable(false)
        } else {
            setDescriptionEditable(true)
            setDescriptionValue(task.description)
            // descriptionRef.current.focus()
        }
    }


    const onRemoveAttachment = (attachmentId) => {
        const requiredAttachmentIdx = task.attachments.findIndex(attachment => attachment.id === attachmentId)
        task.attachments.splice(requiredAttachmentIdx, 1)
        saveBoard()
    }

    const onSaveCover = () => {

    }

    const openImgModal = (id) => {
        setIsModal(id)
    }

    if (!group || !task) return <React.Fragment></React.Fragment>
    const { checklist, attachments } = task
    return <section onClick={onGoBack} className='task-details-shadow flex justify-center'>
        <section className='task-details flex col' onClick={(event) => event.stopPropagation()}>

            <DetailsHeader
                task={task}
                group={group}
                onGoBack={onGoBack}
                saveTaskTitle={saveTaskTitle}
            />
            <div className='task-container flex space-between'>
                <div className="task-content">
                    <div className="task-status flex">
                        <div className='section-icon'></div>
                        {task.members?.length > 0 &&
                            <MembersPreview
                                task={task}
                                setModalType={setModalType}
                                boardMembers={newBoard.members}
                            />
                        }
                        {task.labels?.length > 0 && <div className="labels flex col">
                            <h3>Labels</h3>
                            <section className='task-labels flex'>
                                {task.labels.map(label => {
                                    return <div className="label" style={{ backgroundColor: label }} key={label} ></div>
                                })}
                                <div className='add-label flex justify-center align-center' onClick={() => setModalType('labels')} ><IAdd /></div>
                            </section>
                        </div>
                        }
                    </div>
                    <div className="description flex">
                        <div className='section-icon'>
                            <IDescription />
                        </div>
                        <div className="description-data flex col">
                            <h2>Description</h2>
                            {!isDescriptionEditable && <p placeholder={task.description} onClick={toggleEditDescription}>{!task.description ? 'Add a more detailed description...' : `${task.description}`}</p>}
                            {isDescriptionEditable && <div className='edit-description'>
                                <TextareaAutosize
                                    onChange={handleDescriptionChange}
                                    autoFocus
                                    onBlur={() => {
                                        toggleEditDescription()
                                        saveTaskDescription()
                                    }}
                                    maxRows={4}
                                    aria-label="maximum height"
                                    placeholder='Add a more detailed description...'
                                    defaultValue={task.description ? task.description : ''}
                                    style={{ width: '100%', minHeight: '108px' }}
                                />
                                <button className='btn-save'>Save</button>
                                <button className='btn-cancel' onMouseDown={(event) => { event.preventDefault(); toggleEditDescription() }}>Cancel</button>
                            </div>}
                        </div>
                    </div>

                    {checklist?.length > 0 && <ChecklistList checklist={checklist} saveChecklistTask={onSaveChecklistTask} setIsDone={onSetIsDone} deleteClTask={onDeleteClTask} deleteChecklist={onDeleteChecklist} boardMembers={newBoard.members} generalTask={task} saveMemberToClTask={saveMemberToClTask} />}

                    {attachments?.length > 0 && <AttachmentList attachments={attachments} removeAttachment={onRemoveAttachment} openImgModal={openImgModal} saveAttachment={onSaveAttachment} />}
                </div>

                <TaskEdit
                    setModalType={setModalType}
                    modalType={modalType}
                    closeModal={closeModal}
                    onArchiveTask={onArchiveTask}
                    task={task}
                    group={group}
                    boardId={boardId}
                    boardMembers={newBoard.members}
                    saveMembers={saveMembers}
                    saveLabels={saveLabels}
                    saveChecklist={saveChecklist}
                    onSaveAttachment={onSaveAttachment}
                    saveCover={onSaveCover}
                />

            </div>
        </section>
    </section>
}