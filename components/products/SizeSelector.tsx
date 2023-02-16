import { ISize } from "@/interfaces";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

interface Props{
    selectorSize?: ISize;
    sizes: ISize[];
}
export const SizeSelector:FC<Props> = ({selectorSize, sizes}) => {
  return (
    <Box>
        {
            sizes.map(size => (
                <Button 
                    key={size}
                    size='small'
                    color={selectorSize === size ? 'primary' :'info'}
                >
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}
