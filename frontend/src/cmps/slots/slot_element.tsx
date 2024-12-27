import { Card, Grid, Typography } from '@mui/material'
import React from 'react'
import { SlotTableELement } from './slot_table_element.tsx'
import { SlotTable } from '../../services/slot.service.ts'

export function SlotELement({slot, reserveTable}) {
  return (
    <Grid item key={slot._id} xs={12}>
    <Card sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">
        {(new Date(slot.time)).getUTCHours() + ":00"}
      </Typography>
      <Grid container spacing={1} mt={1}>
        {slot.tables.map((table: SlotTable) => (
         <Grid item key={table.id} onClick={() => {
          if (table.isAvailable) {
            reserveTable(table, slot._id, slot.time)
          }
        }}> 
         <SlotTableELement table={table} />
         </Grid>
        ))}
      </Grid>
    </Card>
  </Grid>

)
}
