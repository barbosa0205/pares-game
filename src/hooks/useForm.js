import React, { useState } from 'react'

export const useForm = (initialState, validationsForm) => {
    const [values, setValues] = React.useState(initialState)
    const [errors, setErrors] = useState(null)
    const handleInputChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    const handleBlur = e => {
        handleInputChange(e)
        setErrors(validationsForm(values))
    }

    return [values, handleInputChange, handleBlur]
}
