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
                className={
                    name.id === selectedId ? 'list-item selected' : 'list-item'
                }
            >
                <button type="button" onClick={() => setSelectedName(name)}>
                    {name.name}
                </button>
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
