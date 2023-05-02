import React from "react"
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Controller, } from "react-hook-form"

const FormSelect = ({
	name,
	control,
	label,
	options,
	rules,
	disabled,
}) => {
	const optionsHandler = () => {
		return options.map(({ value, label, }) => {
			return (
				<MenuItem
					key={value}
					value={value}
				>
					{label}
				</MenuItem>
			)
		})
	}

	return (
		<FormControl sx={{ mt: '2rem', width: '600px' }}>
			<InputLabel
				id={label}
			>
				{label}
			</InputLabel>

			<Controller
				name={name}
				control={control}
				rules={rules}
				render={({
					field: { onChange, value },
					fieldState: { error },
					formState,
				}) => (
					<Select
						onChange={onChange}
						value={value}
						label={label}
						helperText={error ? error.message : null}
						error={!!error}
						disabled={disabled}
					>
						{optionsHandler()}
					</Select>
				)}
			/>
		</FormControl>
	)
}

export default FormSelect
