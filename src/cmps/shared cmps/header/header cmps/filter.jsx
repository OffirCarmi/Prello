import React, { useState } from 'react'
import { DynamicFilter } from './dynamic-filter.jsx'
// import { RecentlyCreatedFilter } from './Recently-created-filter.jsx'

export const Filter = ({ getFilterInfo, miniBoards }) => {
    const [modalType, setModal] = useState(null)
    const onToggleModal = (type) => {

        setModal(type)
        getFilterInfo(type)
    }
    const sortedBoards = miniBoards.sort((boardA, boardB) => boardB.createdAt - boardA.createdAt)
    const starredBoards = []
    const RecentBoards = []
    sortedBoards.forEach((board, idx) => {
        if (idx < 5) {
            RecentBoards.push(board)
        }
        if (board.isStarred) starredBoards.push(board)
    })
    return <div className="filter">
        <button onClick={() => onToggleModal('recent')} className="recent">{modalType === 'recent' && <DynamicFilter boards={RecentBoards} modalType={modalType} />}
            Recent <svg viewBox="0 0 20 20"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" /></svg> </button>
        <button onClick={() => onToggleModal('starred')} className="stared">{modalType === 'starred' && <DynamicFilter boards={starredBoards} modalType={modalType} />}
            Stared <svg viewBox="0 0 20 20"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" /></svg></button>
        {/* <button onClick={() => onToggleModal('template')} className="template">{modalType === '' && <DynamicFilter boards={boards} />}
            Template <svg viewBox="0 0 20 20"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" /></svg></button> */}
    </div>
}
