import React, { useState } from 'react'
import { DataQuery, DataMutation } from '@dhis2/app-runtime'
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

const MyApp = () => (
    <div className={classes.container}>
        <DataQuery query={query}>
            {({ error, loading, data, refetch }) => {
                console.log(data)
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
