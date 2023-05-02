import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import TextField from '../text-field/TextField'
import InputMask from 'react-input-mask'

const FormTextField = ({ name, control, label, rules, mask, type, placeholder,}) => {

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({
				field: { onChange, value },
				fieldState: { error },
				formState,
			}) => (
				mask
					?
					<InputMask mask={typeof mask === 'function' ? mask(value) : mask} value={value} onChange={onChange}>
						{
							() => <TextField
								helperText={error ? error.message : null}
								error={!!error}
								label={label}
								type={type}
								placeholder={placeholder}
							/>
						}
					</InputMask>
					:
					<TextField
						helperText={error ? error.message : null}
						error={!!error}
						onChange={onChange}
						value={value}
						label={label}
						type={type}
						placeholder={placeholder}
					/>
			)}
		/>
	)
}

export default FormTextField
