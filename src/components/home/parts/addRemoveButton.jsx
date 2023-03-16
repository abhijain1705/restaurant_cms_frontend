import React from 'react'

const AddRemoveBtn = ({ fnToRun, add }) => {
    return (
        <div
            onClick={fnToRun}
            className={`flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800`}
        >
            <p className="text-2xl text-gray-400 dark:text-gray-500">add here(+)</p>
        </div>
    )
}

export default AddRemoveBtn