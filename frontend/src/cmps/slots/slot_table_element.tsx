import { Card, Typography } from '@mui/material'
import React from 'react'
import { SlotTable } from '../../services/slot.service'

export function SlotTableELement({table} : {table: SlotTable}) {
  return (
            <Card
              sx={{
                p: 2,
                backgroundColor: table.isAvailable ? 'green' : 'grey',
                cursor: table.isAvailable ? 'pointer' : 'not-allowed',
                opacity: table.isAvailable ? 1 : 0.6,
                '&:hover': {
                  backgroundColor: table.isAvailable ? 'primary.main' : 'grey',
                },
              }}
              
            >
              <Typography variant="body1">
                Table for {Number(table.capacity)}
              </Typography>
              <Typography variant="body2">
                {table.isAvailable ? 'Available' : 'Not Available'}
              </Typography>
            </Card>
  )
}
