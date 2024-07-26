import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Container, MenuItem, Modal, TextField, Typography } from "@mui/material";
import css from "../../styles/ModelsWindow/PlusWindowHistory.module.css";
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoneyIcon from '@mui/icons-material/Money';
import RedeemIcon from '@mui/icons-material/Redeem';
import { ICategories } from "../../interfaces";

interface IProps {
    open: boolean,
    handleClose: () => void,
    addHistoryItem: (item: {
        accountName: string;
        amount: number;
        categoryName: string;
        comment: string }) => void
}

const categories: ICategories[] = [
    { id: 1, name: 'Salary', icon: <MoneyIcon /> },
    { id: 2, name: 'Interest', icon: <AccountBalanceIcon /> },
    { id: 3, name: 'Refunds', icon: <HandshakeOutlinedIcon /> },
    { id: 4, name: 'Gifts', icon: <RedeemIcon /> }
]

const PlusWindowHistory: FC<IProps> = ({ open, handleClose, addHistoryItem }) => {
    const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
    const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
    const [selectedAccountName, setSelectedAccountName] = useState<string | null>(null);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [amount, setAmount] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');

    useEffect(() => {
        const storedAccounts = localStorage.getItem('accounts');
        if (storedAccounts) {
            try {
                setAccounts(JSON.parse(storedAccounts));
            } catch (error) {
                console.error('Error parsing JSON from localStorage', error);
            }
        }
    }, []);

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategoryName(categoryName);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const accountId = Number(event.target.value);
        const selectedAccount = accounts.find(account => account.id === accountId);
        if (selectedAccount) {
            setSelectedAccountId(accountId);
            setSelectedAccountName(selectedAccount.name);
        }
    };

    const handleDoneClick = () => {
        if (selectedAccountId !== null && amount !== null && amount > 0) {
            const updatedAccounts = accounts.map(account => {
                if (account.id === selectedAccountId) {
                    return {
                        ...account,
                        balance: account.balance + amount
                    };
                }
                return account;
            });

            localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
            setAccounts(updatedAccounts);

            const newHistoryItem = {
                accountName: selectedAccountName!,
                amount: amount,
                categoryName: selectedCategoryName!,
                comment: comment
            };

            const storedHistory = localStorage.getItem('history');
            const historyArray = storedHistory ? JSON.parse(storedHistory) : [];
            historyArray.push(newHistoryItem);
            localStorage.setItem('history', JSON.stringify(historyArray));

            addHistoryItem(newHistoryItem);
            handleClose();
        }
    };

    return (
        <Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={css.style}>
                    <Box>
                        <TextField
                            id="standard-select-account"
                            select
                            label="Choose an account..."
                            variant="standard"
                            style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                            value={selectedAccountId || ''}
                            onChange={handleAccountChange}
                        >
                            {accounts.map((account) => (
                                <MenuItem key={account.id} value={account.id}>
                                    <Box display="flex" alignItems="center" justifyContent={"space-between"}>
                                        <Typography sx={{ marginLeft: 1 }}>{account.name}</Typography>
                                        <Typography>{account.balance} {account.currency}</Typography>
                                    </Box>
                                </MenuItem>
                            ))}
                        </TextField>
                        <Box className={css.category}>
                            <Typography variant={'h6'} color={'black'}>
                                Category: {selectedCategoryName || 'Not chosen'}
                            </Typography>
                        </Box>
                        <Box className={css.containerIcons}>
                            {
                                categories.map(category => (
                                    <Button
                                        key={category.id}
                                        style={{
                                            backgroundColor: selectedCategoryName === category.name ? 'lightgray' : 'transparent',
                                        }}
                                        onClick={() => handleCategoryClick(category.name)}
                                    >
                                        {category.icon}
                                    </Button>
                                ))
                            }
                        </Box>

                        <Box>
                            <TextField
                                sx={{ width: '100%', marginTop: '20px' }}
                                id="standard-basic"
                                label="Income amount"
                                variant="standard"
                                type="number"
                                value={amount !== null ? amount : ''}
                                onChange={handleAmountChange}
                            />

                            <TextField
                                sx={{ width: '100%', marginTop: '20px' }}
                                id="standard-basic"
                                label="Comment"
                                variant="standard"
                                value={comment}
                                onChange={handleCommentChange}
                            />
                        </Box>
                    </Box>

                    <Box className={css.buttonGroup}>
                        <Button variant="contained" color="error" onClick={handleClose}>
                            Close
                        </Button>

                        <Button variant="contained" color="success" onClick={handleDoneClick}>
                            Done
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export { PlusWindowHistory };
