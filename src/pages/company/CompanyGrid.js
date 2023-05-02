import React, { useState } from 'react'
import { Button, } from 'components'
import { Box, Typography, } from '@mui/material'
import { DrawerTemplate } from 'templates'
import { useNavigate } from "react-router-dom";
import { DataGrid, } from '@mui/x-data-grid';

const columns = [
    {
        field: 'name',
        headerName: 'Nome',
        width: 150,
    },
    {
        field: 'cnpj',
        headerName: 'CNPJ',
        width: 150,
    },
    {
        field: 'cep',
        headerName: 'CEP',
        width: 110,
    },
];

const rows = [
    { id: 1, name: 'Empresa 1', cnpj: '99.999.999/9999-99', cep: '11111-111', },
    { id: 2, name: 'Empresa 2', cnpj: '22.222.222/2222-22', cep: '22222-222', },
];

const CompanyPage = () => {
    const navigate = useNavigate();
    // Faltaram funcionalidades de: edição dos itens, vincular com api (dados estão mockados)

    return (
        <DrawerTemplate>
            <Box
                sx={{
                    px: '4rem',
                    display: 'flex',
                    width: '100%',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    flexDirection: 'column'
                }}
            >
                <Typography
                    variant='h5'
                >
                    Empresa
                </Typography>
                <Box
                    sx={{ mt: '2rem' }}
                >
                    <Button
                        onClick={() => navigate('/company/new')}
                    >
                        Adicionar
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        mt: '2rem',
                        width: '100%',
                    }}
                >
                    <DataGrid
                        sx={{ width: '100%', }}
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Box>
        </DrawerTemplate>
    );
}

export default CompanyPage
