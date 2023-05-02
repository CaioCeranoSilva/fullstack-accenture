import React, { useState } from 'react'
import { Button, TextField, FormTextField, Alert, } from 'components'
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Paper, } from '@mui/material'
import { DrawerTemplate } from 'templates'
import { makeRequest, } from 'utils/Utils'
import LoadingButton from '@mui/lab/LoadingButton'
import { FormProvider, useForm, } from "react-hook-form"
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import { getCep } from 'utils/Utils'

// Faltaram funcionalidades de: edição dos itens, vincular com api (cadastro é só um exemplo)

const SupplierNew = () => {
    const methods = useForm({
        defaultValues: {
            name: '',
            cnpj: ' ',
            email: '',
            cep: '',
        }
    })

    const handleClose = () => {
        setAlertData({ ...alertData, open: false })
    }

    const [alertData, setAlertData] = useState({
        open: false,
        handleClose: handleClose,
        message: '',
        severity: '',
    })

    const { handleSubmit, setError, reset, control, setValue, watch } = methods
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

    const maskHandler = (newValue) => {
        if (!newValue || newValue.length === 0)
            return "999999999999999999"

        if (newValue.replace(/\D/g, "").length < 12)
            return "999.999.999-999999"
        else
            return "99.999.999/9999-99"
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
                    Cadastro de Fornecedor
                </Typography>

                <FormTextField
                    name="name"
                    control={control}
                    label="Nome"
                    rules={{
                        required: { value: true, message: 'Campo necessário' },
                    }}
                />

                <FormTextField
                    mask={maskHandler}
                    name="cnpj"
                    control={control}
                    label="CNPJ"
                    rules={{
                        required: { value: true, message: 'Campo necessário' },
                    }}
                />

                <FormTextField
                    name="email"
                    control={control}
                    label="E-mail"
                    rules={{
                        required: { value: true, message: 'Campo necessário' },
                    }}
                    type="email"
                    placeholder='email@exemplo.com'
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
    )
}

export default SupplierNew
