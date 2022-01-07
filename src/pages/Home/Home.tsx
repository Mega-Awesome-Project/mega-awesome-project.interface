import React, { useState } from 'react'
import { Box, Button, Card, IconButton, Link, List, ListItem, Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import styled from '@emotion/styled'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { injected } from '../../connectors'
import { useBalance, useReadName, useSetName } from '../../hooks'
import { ChainName, Explorer, NetworkId } from '../../connectors'
import { Adjust, Logout } from '@mui/icons-material';
import Davatar from '@davatar/react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const FlexWrapper = styled(Box)`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const FlexCard = styled(Card)`
    max-width: -webkit-fill-available;
`

const FlexRow = styled(Stack)`
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin: 5px 0;
    background: #ededed;
    border-radius: 5px;
`

const Home: React.FC = () => {
    const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React<Web3Provider>()
    const { ETHBalance } = useBalance()
    const [isConnecting, setIsConnecting] = useState<boolean>(false)
    const [isRegistering, setIsRegistering] = useState<boolean>(false)
    const { addressName, updateAddressName } = useReadName()
    const setName = useSetName()

    const connect = async () => {
        try {
            setIsConnecting(true)
            await activate(injected)
            setIsConnecting(false)
        } catch (err) {
            setIsConnecting(false)
            console.log(err)
        }
    }

    const disconnect = async () => {
        try {
            deactivate()
        } catch (err) {
            console.log(err)
        }
    }

    const validationSchema = yup.object({
        name: yup
            .string()
            .required('The name is required')
    })

    const formik = useFormik({
        initialValues: {
            name: addressName ?? ''
        },
        validationSchema: validationSchema,
            onSubmit: async (values: any, actions: any) => {
            if (values && values.name && values.name !== '') {
            try {
                setIsRegistering(true)
                await setName(values.name)
                await updateAddressName()
                actions.resetForm()
                setIsRegistering(false)
            } catch (e) {
                alert(e)
                setIsRegistering(false)
            }
        } else {
            return
        }
        },
    });

    return (
        <FlexWrapper>
            <FlexCard>
                {active && chainId && account
                ? <Box p={2}>
                    <FlexRow>
                        <Typography component="p">Network:</Typography>
                        <Box display={'flex'} alignItems={'center'}>
                            <Adjust color={'success'} />
                            <Typography component="p" ml={1}>{ChainName[chainId as NetworkId]}</Typography>
                            <IconButton aria-label="logout picture" component="span" onClick={disconnect}>
                                <Logout />
                            </IconButton>
                        </Box>
                    </FlexRow>
                    <FlexRow>
                        <Typography component="p" mr={1}>Address:</Typography>
                        <Box display={'flex'} alignItems={'center'}>
                            <Davatar size={24} address={account} generatedAvatarType='jazzicon' />
                            <Link 
                                underline="always"
                                href={`${Explorer[chainId as NetworkId]}/address/${account}`}
                                target="_blank"
                                rel="noopener"
                                ml={1}
                            >
                                {account}
                            </Link>
                        </Box>
                    </FlexRow>
                    <FlexRow>
                        <Typography component="p">ETH Balance:</Typography>
                        <Typography component="p">{ETHBalance}</Typography>
                    </FlexRow>
                    <FlexRow>
                        <Typography component="p">Address Name:</Typography>
                        <Typography component="p">{addressName ?? 'No name found'}</Typography>
                    </FlexRow>
                    <Box mt={3}>
                        <Stack direction={'row'} justifyContent={'center'} mb={1}>
                            <Typography variant="h5" component="p">Register a new name for this address</Typography>
                        </Stack>
                        <form  onSubmit={formik.handleSubmit}>
                            <Stack direction={'row'} justifyContent={'center'} mb={1}>
                                <TextField 
                                    id="name"
                                    label="New Name"
                                    variant="outlined"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    disabled={isRegistering}
                                />
                            </Stack>
                            <Stack direction={'row'} justifyContent={'center'} mb={1}>
                                <LoadingButton
                                    type="submit"
                                    loading={isRegistering}
                                    variant="outlined"
                                >
                                    Register
                                </LoadingButton>
                            </Stack>
                        </form>
                    </Box>
                </Box>
                : <Box sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography variant="h4" component="p" padding={4}>
                        Please connect your wallet to enjoy this awesome app!
                    </Typography>

                    <LoadingButton
                        loading={isConnecting}
                        variant="outlined"
                        onClick={connect}
                    >
                        Connect
                    </LoadingButton>
                </Box>
                }
            </FlexCard>
        </FlexWrapper>
    );
}

export default Home;