import React from 'react'
import { Button } from '@material-ui/core'

function Label(props) {

    return (
        <div>
            {props.labels.map((label) =>
                <span className={'label'}>
                    <Button style={{ textTransform: 'none' }}>{label}</Button>
                </span>
            )}
        </div>
    )
}

export default Label
