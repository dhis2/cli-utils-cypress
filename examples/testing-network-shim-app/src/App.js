import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AddUpdateName } from './AddUpdateName'
import { NameFilter } from './NameFilter'
import { NamesList } from './NamesList'
import { resourcePath } from './resourcePath'

function App() {
    const [selectedName, setSelectedName] = useState(null)
    const [names, setNames] = useState([])
    const fetchNames = filterStr => {
        axios
            .get(resourcePath('names', undefined, filterStr))
            .then(response => {
                setNames(response.data)
            })
    }
    const addOrUpdateName = name => {
        const promise = selectedName
            ? axios.patch(resourcePath('names', selectedName.id), { name })
            : axios.post(resourcePath('names'), { name })

        promise.then(() => {
            setSelectedName(null)
            fetchNames()
        })
    }
    const deleteName = id => {
        axios.delete(resourcePath('names', id)).then(() => {
            setSelectedName(null)
            fetchNames()
        })
    }

    useEffect(() => {
        fetchNames()
        // We're not doing anything with this request but it should still be captured
        axios.get(resourcePath('animals'), {})
    }, [])

    return (
        <div className="app">
            <NameFilter fetch={fetchNames} />
            <NamesList
                names={names}
                selectedId={selectedName && selectedName.id}
                setSelectedName={setSelectedName}
                deleteName={deleteName}
            />
            <AddUpdateName
                submit={addOrUpdateName}
                clear={() => setSelectedName(null)}
                selectedName={selectedName && selectedName.name}
            />
        </div>
    )
}

export default App
