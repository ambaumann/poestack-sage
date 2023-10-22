import {useEchoContext} from 'poestack-echo-common'
import React, {useEffect, useState} from 'react'

function App(): JSX.Element {
    const {stashService} = useEchoContext()
    const stashItems = stashService.useStashItems()

    const [search, setSearch] = useState("")

    return (
        <>
            <div>
                <button onClick={() => {
                    stashService.stashApi.getStashes("Ancestor").subscribe()
                }}>Load Stashes
                </button>
                <input
                    className="appearance-none bg-indigo-700 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div>
                    {stashItems
                        .filter((e) => !!e.note)
                        .filter((item) => !search.length || item.typeLine.toLowerCase().includes(search.toLowerCase()))
                        .map((item) => (<div>{item.typeLine}: {item.note}</div>))}
                </div>
            </div>
        </>
    )
}

export default App
