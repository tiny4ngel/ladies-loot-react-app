import { useState } from "react";

export default function useForm(submitHandler, initialValues, validate) {
    const [values, setValues] = useState(initialValues);

    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validate || validate(values)) {
            submitHandler(values);
        }
    }

    return {
        values,
        onChange,
        onSubmit,
        setValues,
    }
}
