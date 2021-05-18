import { DataQuery, DataMutation } from '@dhis2/app-runtime'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import classes from './App.module.css'

const query = {
    userGroups: {
        resource: 'userGroups',
    },
}
const addMutation = {
    resource: 'userGroups',
    type: 'create',
    data: data => {
        console.log('whats my name!', data)
        return { name: data.name }
    },
}

const Adder = ({ refetch }) => {
    const [name, setName] = useState('')
    return (
        <div>
            <input
                type="text"
                placeholder="New group name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <DataMutation mutation={addMutation} onComplete={refetch}>
                {([mutate, { called, loading }]) => (
                    <button
                        disabled={called && loading}
                        onClick={() => mutate({ name })}
                    >
                        Add
                    </button>
                )}
            </DataMutation>
        </div>
    )
}

Adder.propTypes = {
    refetch: PropTypes.func.isRequired,
}

const deleteMutation = {
    resource: 'userGroups',
    id: ({ id }) => id,
    type: 'delete',
}

const UserGroupListItem = ({ id, displayName, refetch }) => (
    <li>
        {displayName}
        <DataMutation
            mutation={deleteMutation}
            variables={{ id }}
            onComplete={refetch}
        >
            {([mutate, { called, loading }]) => (
                <button disabled={called && loading} onClick={mutate}>
                    Delete
                </button>
            )}
        </DataMutation>
    </li>
)

UserGroupListItem.propTypes = {
    displayName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    refetch: PropTypes.func.isRequired,
}

const MyApp = () => (
    <div className={classes.container}>
        <DataQuery query={query}>
            {({ error, loading, data, refetch }) => {
                if (error) return <span>ERROR</span>
                if (loading) return <span>...</span>
                return (
                    <>
                        <Adder refetch={refetch} />
                        <ul>
                            {data.userGroups.userGroups.map(
                                ({ id, displayName }) => (
                                    <UserGroupListItem
                                        key={id}
                                        id={id}
                                        displayName={displayName}
                                        refetch={refetch}
                                    />
                                )
                            )}
                        </ul>
                    </>
                )
            }}
        </DataQuery>
    </div>
)

export default MyApp
