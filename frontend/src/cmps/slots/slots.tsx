import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import { getSlots, Slot, SlotTable } from '../../services/slot.service.ts';
import { endLoader, setError, startLoader } from '../../store/system.actions.ts';
import AppCmpWrapper from '../app_cmp_wrapper.tsx';
import { SlotELement } from './slot_element.tsx';
import { AddReservationModal } from './add_reservation_modal.tsx';
import { saveReservation } from '../../services/reservation.service.ts';
import { Restaurant } from '../../services/rest.service.ts';

function Slots({ rest, selectedDate } : { rest: Restaurant, selectedDate: Date }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [filteredSlots, setFilteredSlots] = useState<Slot[]>([]);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<SlotTable>();
  const [selectedSlotId, setSelectedSlotId] = useState<string>();
  const [selectedTime, setSelectedTime] = useState<Date | string>(new Date());

  useEffect(() => {
    startLoader();
    fetchSlots();
  }, [selectedDate]);
  
  async function fetchSlots() {
    try {
      const data = await getSlots(rest._id, selectedDate); // Adjust this to match your API
      setSlots(data);
      setFilteredSlots(data);
    } catch (error) {
      setError();
      console.error('Failed to fetch slots', error);
    } finally {
      endLoader();
    }
  };
  function handleToggleAvailable() {
    if (showOnlyAvailable) {
      setFilteredSlots(slots);
    } else {
      setFilteredSlots(slots.map(slot => ({
        ...slot,
        tables: slot.tables.filter(table => table.isAvailable)
      })));
    }
    setShowOnlyAvailable(!showOnlyAvailable);
  };

  function reserveTable(table: SlotTable, slotId: string, time: Date | string) {
    setSelectedTable(table);
    setSelectedSlotId(slotId);
    setSelectedTime(time);
    setIsModalOpen(true);
  };

  async function handleReservationConfirm (phone: string) {
    startLoader()
    try {
      if (selectedTable && selectedSlotId) await saveReservation(selectedTime, selectedTable.id, phone, selectedSlotId, rest.name)
        fetchSlots()
    } catch (error) {
        setError()      
    } finally {
      setIsModalOpen(false);
      endLoader()
    }
  };

  return (
    <>
      <Button 
        onClick={handleToggleAvailable}
        sx={{ mb: 3, mt: 5, px: 3, py: 1,
          fontSize: '16px',
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': {
            color: 'white',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        {showOnlyAvailable ? 'Show all slots' : 'Show only available slots'}
      </Button>
      <Box sx={{ mt: 5, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={2} justifyContent="center">
          {filteredSlots.length && filteredSlots.map((slot) => (
           <SlotELement reserveTable={reserveTable} slot={slot} key={slot._id} />
          ))}
          {!filteredSlots.length && <Typography variant="h6"> No slots were found for this date </Typography>}
        </Grid>
      </Box>
      {(selectedTable && isModalOpen) && (
        <AddReservationModal 
          open={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={handleReservationConfirm} 
          tableCapacity={selectedTable.capacity} 
        />
      )}
    </>
  );
};

export default AppCmpWrapper(Slots);
