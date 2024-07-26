import React, { FC, useEffect, useState } from 'react';
import css from '../styles/Money.module.css';
import { Box, Button, Container, MenuItem, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { ICurrencies, ICurrencyOption } from "../interfaces";
import { IAccount } from "../interfaces";
import { FaDollarSign, FaEuroSign, FaHryvnia } from "react-icons/fa";
import { TbCurrencyZloty } from "react-icons/tb";
import { PiCurrencyGbpBold } from "react-icons/pi";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

const currencyOptions: ICurrencyOption[] = [
    { id: 1, name: 'Credit cards', icon: <PaymentIcon /> },
    { id: 2, name: 'Bank account', icon: <AccountBalanceIcon /> },
    { id: 3, name: 'Cash', icon: <LocalAtmIcon /> },
    { id: 4, name: 'Cryptocurrencies', icon: <CurrencyBitcoinIcon /> },
];

const currencies: ICurrencies[] = [
    { id: 1, name: 'USD', icon: <FaDollarSign /> },
    { id: 2, name: 'EUR', icon: <FaEuroSign /> },
    { id: 3, name: 'UAN', icon: <FaHryvnia /> },
    { id: 4, name: 'PLN', icon: <TbCurrencyZloty /> },
    { id: 5, name: 'GBP', icon: <PiCurrencyGbpBold /> },
];

const Money: FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedCurrency, setSelectedCurrency] = useState<ICurrencies>(currencies[2]);
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<ICurrencyOption>(currencyOptions[0]);
    const [balance, setBalance] = useState<number>(0);
    const [accounts, setAccounts] = useState<IAccount[]>(() => {
        const savedAccounts = localStorage.getItem('accounts');
        return savedAccounts ? JSON.parse(savedAccounts) : [];
    });
    const [accountId, setAccountId] = useState<number>(() => {
        const savedAccounts = localStorage.getItem('accounts');
        return savedAccounts ? JSON.parse(savedAccounts).length + 1 : 1;
    });
    const [currentAccountId, setCurrentAccountId] = useState<number | null>(null);

    useEffect(() => {
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }, [accounts]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
    };

    const handleAddAccount = () => {
        const newAccount: IAccount = {
            id: accountId,
            name,
            type: type.name,
            currency: selectedCurrency.name,
            balance
        };
        setAccounts([...accounts, newAccount]);
        setAccountId(accountId + 1);
        setName('');
        setType(currencyOptions[0]);
        setSelectedCurrency(currencies[2]);
        setBalance(0);
        handleClose();
    };

    const handleEditAccount = (account: IAccount) => {
        setName(account.name);
        setType(currencyOptions.find(option => option.name === account.type) || currencyOptions[0]);
        setSelectedCurrency(currencies.find(option => option.name === account.currency) || currencies[2]);
        setBalance(account.balance);
        setCurrentAccountId(account.id);
        setEditMode(true);
        handleOpen();
    };

    const handleUpdateAccount = () => {
        if (currentAccountId === null) return;

        const updatedAccounts = accounts.map(account =>
            account.id === currentAccountId
                ? { ...account, name, type: type.name, currency: selectedCurrency.name, balance }
                : account
        );
        setAccounts(updatedAccounts);
        handleClose();
    };

    const handleDeleteAccount = (id: number) => {
        const updatedAccounts = accounts.filter(account => account.id !== id);
        setAccounts(updatedAccounts);
    };

    return (
        <Container>
            <Box className={css.addAccount}>
                <Typography variant="h4" mt={2} color={'white'}>
                    All accounts
                </Typography>
                <AddIcon onClick={handleOpen} className={css.addIcon} />
            </Box>
            <Box>
                {accounts.length === 0 ? (
                    <Box className={css.noAccounts}>
                        <h1>There is nothing here yet...</h1>
                        <h1>Use the button above to add accounts...</h1>
                    </Box>
                ) : (
                    <Box className={css.hasAccounts}>
                        {accounts.map(account => {
                            const accountType = currencyOptions.find(option => option.name === account.type);
                            const accountCurrency = currencies.find(option => option.name === account.currency);

                            if (!accountType || !accountCurrency) {
                                return null;
                            }

                            return (
                                <Box key={account.id} className={css.accountBlock}>
                                    <Box display="flex" alignItems="center">
                                        <Box>
                                            {accountType.icon}
                                        </Box>
                                        <Typography className={css.accountName} variant="h6">{account.name}</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={'10px'} justifyContent="space-between">
                                        <Typography>{account.balance.toFixed(2)}</Typography>
                                        <Typography sx={{ marginLeft: 1 }}>{accountCurrency.name}</Typography>
                                    </Box>

                                    <Box className={css.changeButtons}>
                                        <Button onClick={() => handleDeleteAccount(account.id)}>
                                            <DeleteOutlinedIcon style={{ fontSize: '20px' }} />
                                        </Button>

                                        <Button onClick={() => handleEditAccount(account)}>
                                            <BorderColorOutlinedIcon style={{ fontSize: '20px' }} />
                                        </Button>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                )}
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={css.style}>
                    <Box>
                        <TextField
                            sx={{ width: '100%' }}
                            id="standard-basic"
                            label="Name"
                            variant="standard"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Box className={css.currencies}>
                            <TextField
                                id="standard-select-type"
                                select
                                value={type.name}
                                onChange={(e) => setType(currencyOptions.find(option => option.name === e.target.value) || currencyOptions[0])}
                                variant="standard"
                                style={{ marginTop: 20, width: 200 }}
                            >
                                {currencyOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.name}>
                                        <Box display="flex" alignItems="center">
                                            {option.icon}
                                            <Typography sx={{ marginLeft: 1 }}>{option.name}</Typography>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                id="standard-select-currency"
                                select
                                value={selectedCurrency.name}
                                onChange={(event) => setSelectedCurrency(currencies.find(option => option.name === event.target.value) || currencies[2])}
                                variant="standard"
                                style={{ marginTop: 20, width: 70 }}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.id} value={option.name}>
                                        <Box display="flex" alignItems="center">
                                            <Typography sx={{ marginLeft: 1 }}>{option.name}</Typography>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <TextField
                            sx={{ width: '100%', marginTop: '10px' }}
                            id="standard-basic"
                            label={`Balance, ${selectedCurrency.name}`}
                            variant="standard"
                            type="number"
                            value={balance}
                            onChange={(e) => setBalance(Number(e.target.value))}
                        />
                    </Box>
                    <Box className={css.buttonGroup}>
                        <Button variant="contained" color="error" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="contained" color="success" onClick={editMode ? handleUpdateAccount : handleAddAccount}>
                            {editMode ? 'Update' : 'Done'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export { Money };
