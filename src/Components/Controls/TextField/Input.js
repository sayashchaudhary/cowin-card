import React from "react"
import { TextField } from "@mui/material"

export default function Input(props) {
  const { name, label, value, error = null, onChange, type, ...other } = props
  return (
    <TextField
      variant="standard"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  )
}
