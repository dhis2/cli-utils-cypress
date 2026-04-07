import propTypes from 'prop-types'
import React from 'react'

export const NamesList = ({
    names,
    setSelectedName,
    deleteName,
    selectedId,
}) => (
    <ul className="list">
        {names.map(name => (
            <li
                key={name.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedName(name)}
                onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedName(name)
                    }
                }}
                className={
                    name.id === selectedId ? 'list-item selected' : 'list-item'
                }
            >
                {name.name}
                <button type="button" onClick={() => deleteName(name.id)}>
                    Delete
                </button>
            </li>
        ))}
    </ul>
)

NamesList.propTypes = {
    deleteName: propTypes.func.isRequired,
    names: propTypes.arrayOf(
        propTypes.shape({
            id: propTypes.number,
            name: propTypes.string,
        })
    ).isRequired,
    setSelectedName: propTypes.func.isRequired,
    selectedId: propTypes.number,
}
