import { ShopLayout } from "@/components/layouts";
import {
    Typography,
    Grid,
    Card,
    CardContent,
    Divider,
    Box,
    Chip,
  } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import NextLink from "next/link";
const columns: GridColDef[] =[
    {field: 'id', headerName:'ID', width: 100},
    {field: 'fullname', headerName:'Nombre Completo', width: 300},
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra informacion si está pagada o no',
        width: 200,
        renderCell: (params) => { //Ya no es necesario tipar en renderCell
            return (
                params.row.paid
                 ? <Chip color="success" label="Pagada" variant="outlined" />
                 : <Chip color="error" label="No Pagada" variant="outlined" />
            )
        }
    },

    {
        field: 'order',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: (params) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    Ver orden
                </NextLink>
            )
        }
    }
];

const rows = [
    {id: 1, paid: true, fullname:'KarlaCab' },
    {id: 2, paid: false, fullname:'Juana' },
    {id: 3, paid: true, fullname:'Andres' },
    {id: 4, paid: true, fullname:'Maria' },
    {id: 5, paid: true, fullname:'JC' },
]

//Las paginas deben tener importacion por defecto
const HistoryPage = () => {
  return (
    <ShopLayout title="Historial de ordenes" pageDescription="Historial de ordenes del cliente" >
        <Typography variant='h1' component='h1' >Historial de ordenes</Typography> {/*Arreglar*/}

        <Grid container>
            <Grid item xs={12} sx= {{height:650, width:'100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />

                

            </Grid>
        </Grid>

    </ShopLayout>
  )
}

export default HistoryPage