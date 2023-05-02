import React, { useState } from 'react'
import { Button, FormTextField, FormSelect, Alert, } from 'components'
import { Box, Typography, } from '@mui/material'
import { DrawerTemplate } from 'templates'
import { useForm } from "react-hook-form";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCep } from 'utils/Utils'

// Faltaram funcionalidades d
//  - Edição dos itens,
//  - Vincular com api (cadastro é só um exemplo), 
//  - Relacionar empresas com a tabela abaixo dos campos, para poder visualizar/excluir os multiplos forncedores relacionados


const CompanyNew = () => {
    const [supplierDisabled, setSupplierDisabled] = useState(true)

    const [rows, setRows] = useState([])
    const datagridColumns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'label',
            headerName: 'Nome',
            width: '30%',
        },
        {
            field: 'typeLabel',
            headerName: 'Tipo',
            width: '30%',
        },
        {
            field: 'age',
            headerName: 'Idade',
            width: '15%',
        },
        {
            field: 'actions',
            headerName: 'Ações',
            sortable: false,
            width: '15%',
            renderCell: (params) => {
                return (
                    <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                        {/* <MatEdit index={params.row.id} /> */}
                        <DeleteIcon />
                    </div>
                );
            }
        },
    ];

    const [suppliers, setSuppliers] = useState([
        // {
        //     label: '',
        //     id: '',
        // },
        {
            label: 'Fornecedor 1 - Empresa',
            value: 1,
            type: 'entity',
            typeLabel: 'Pessoa jurídica',
            age: '',
        },
        {
            label: 'Fornecedor 2 - Indivíduo menor de idade',
            value: 2,
            type: 'individual',
            typeLabel: 'Pessoa física',
            age: '14',
        },
        {
            label: 'Fornecedor 3 - Indivíduo maior de idade',
            value: 3,
            type: 'individual',
            typeLabel: 'Pessoa física',
            age: '23',
        },
    ])
    const handleClose = () => {
        setAlertData({ ...alertData, open: false })
    }

    const [alertData, setAlertData] = useState({
        open: false,
        handleClose: handleClose,
        message: '',
        severity: '',
    })
    const methods = useForm()
    const { handleSubmit, reset, control, setValue, watch, setError, } = methods

    const onSubmit = (data) => {
        return new Promise((resolve, reject) => {
            getCep(data.cep)
                .then((response) => {
                    setAlertData({
                        ...alertData,
                        message: 'Cadastrado com sucesso',
                        severity: 'success',
                        open: true,
                    })
                    resolve(response)
                })
                .catch((error) => {
                    console.log("getCep error: ", error)
                    setError('cep', { type: 'custom', message: 'CEP inválido' });
                    setAlertData({
                        ...alertData,
                        message: 'Erro ao cadastrar',
                        severity: 'error',
                        open: true,
                    })
                    reject(error)
                })
        })
    }

    return (
        <DrawerTemplate>
            <Box
                sx={{
                    px: '4rem',
                    display: 'flex',
                    width: '100%',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    variant='h5'
                >
                    Cadastro de Empresa
                </Typography>

                <FormTextField
                    name="commercialName"
                    control={control}
                    label="Nome fantasia"
                    rules={{
                        required: { value: true, message: 'Campo necessário' },
                    }}
                />

                <FormTextField
                    mask='99.999.999/9999-99'
                    name="cnpj"
                    control={control}
                    label="CNPJ"
                    rules={{
                        required: { value: true, message: 'Campo necessário' },
                    }}
                />

                <FormTextField
                    mask='99999-999'
                    name="cep"
                    control={control}
                    label="CEP"
                    rules={{
                        required: { value: true, message: 'Campo necessário' },
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    <FormSelect
                        name="supplier"
                        control={control}
                        label="Fornecedor"
                        options={suppliers}
                        rules={{
                            required: { value: true, message: 'Campo necessário' },
                        }}
                        disabled={supplierDisabled}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mt: '2rem',
                            pl: '2rem'
                        }}
                    >
                        <Button
                        >
                            Adicionar
                        </Button>
                    </Box>
                </Box>

                <DataGrid
                    sx={{
                        display: 'flex',
                        width: '100%',
                        mt: '2rem',
                    }}
                    rows={rows}
                    columns={datagridColumns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    // checkboxSelection
                    disableRowSelectionOnClick
                />

                <Button
                    onClick={handleSubmit(onSubmit)}
                    sx={{ mt: '2rem' }}
                >
                    Enviar
                </Button>
            </Box>
            <Alert
                open={alertData.open}
                handleClose={alertData.handleClose}
                message={alertData.message}
                severity={alertData.severity}
            />
        </DrawerTemplate>
    );
}

export default CompanyNew
