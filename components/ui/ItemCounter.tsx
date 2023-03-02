import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { FC } from "react"

interface Props{
  currentValue: number;
  maxValue: number;

  //Method
  updatedQuantity: (newValue: number) => void;
}

export const ItemCounter:FC<Props> = ({currentValue, maxValue, updatedQuantity}) => {
  const addOrRemove  = (value: number) => {
    if(value === -1){ //Si el valor quiere bajar a menos de 0, se retorna
      if(currentValue === 1) return;

      return updatedQuantity(currentValue - 1); //Si no es 1, si se puede restar -1
    }

    if (currentValue >= maxValue) return;

    updatedQuantity(currentValue + 1 )
  }


  return (
    <Box display='flex' alignItems='center'>
        <IconButton onClick={ () => addOrRemove(-1) }>
            <RemoveCircleOutline />
        </IconButton>
        <Typography sx={{ width: 40, textAlign:'center' }}> {currentValue} </Typography>
        <IconButton onClick={ () => addOrRemove(+1) }>
            <AddCircleOutline />
        </IconButton>
    </Box>
  )
}
