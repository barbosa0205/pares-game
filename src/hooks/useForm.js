import React from 'react'

export const useForm = initialState => {
    const [values, setValues] = React.useState(initialState)

    const handleInputChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }
    const reset = ({ target }) => {
        setValues({ ...values, [target.name]: target.value })
    }

    return [values, handleInputChange, reset]
}
