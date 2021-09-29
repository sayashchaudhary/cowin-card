import React from "react"
import { Card as MuiCard } from "@mui/material"
import { makeStyles, createStyles } from "@mui/styles"

export default function Card({ children, shadow = true, ...other }) {
  const classes = useStyles()
  return (
    <MuiCard
      classes={ { root: shadow ? classes.shadowRoot : classes.root } }
      { ...other }
    >
      { children }
    </MuiCard>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      boxShadow: 'none',
      borderRadius: 8,
      '& .MuiCardContent-root': {
        padding: 0,
      },
    },
    shadowRoot: {
      boxShadow: '2px 4px 6px 2px rgba(0, 0, 0, 0.06)',
      borderRadius: 8,
      '& .MuiCardContent-root': {
        padding: 0,
      },
    },
  }),
)
