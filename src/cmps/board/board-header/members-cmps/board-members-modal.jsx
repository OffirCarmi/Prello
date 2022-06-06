import React from 'react';

export const BoardMembersModal = ({ member, setUser, onRemoveMember }) => {
    return <section className='members-modal'>
        <section className='members-modal-header'>
            <button className='close-modal reset' onClick={ev => setUser(null)}>
                <svg width='16' height='16' viewBox='0 0 24 24' ><path fillRule='evenodd' clipRule='evenodd' d='M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z' /></svg>
            </button>
            <img src={member.imgUrl} alt='' />
            <span className='member-info'>
                <h3 className='member-name'>{`${member.firstName} ${member.lastName}`}</h3>
                <span className='member-email'>{`${member.email}`}</span>
            </span>
        </section>
        <hr />
        <section className='members-modal-body'>
            <button className='remove-member reset' onClick={ev => {
                setUser(null)
                onRemoveMember(member)
            }}>Remove from board</button>
        </section>
    </section>
}