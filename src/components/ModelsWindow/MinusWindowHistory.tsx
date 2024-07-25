import React, { FC, useState, useEffect } from 'react';
import css from '../../styles/ModelsWindow/MinusWindowHistory.module.css';
import { Box, Button, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { ICategories } from "../../interfaces/Categories.interface";
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import HouseboatOutlinedIcon from '@mui/icons-material/HouseboatOutlined';
import BlenderOutlinedIcon from '@mui/icons-material/BlenderOutlined';
import LocalTaxiOutlinedIcon from '@mui/icons-material/LocalTaxiOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';

interface IProps {
    open: boolean,
    handleClose: () => void,
    addHistoryItem: (item: { accountId: number; amount: number; categoryId: number; comment: string }) => void
}

const categories: ICategories[] = [
    { id: 1, name: 'Groceries', icon: <LocalGroceryStoreOutlinedIcon /> },
    { id: 2, name: 'Restaurant', icon: <RestaurantOutlinedIcon /> },
    { id: 3, name: 'Transport', icon: <DirectionsCarFilledOutlinedIcon /> },
    { id: 4, name: 'Home', icon: <HomeWorkOutlinedIcon /> },
    { id: 5, name: 'Pets', icon: <PetsOutlinedIcon /> },
    { id: 6, name: 'Clothes and shoes', icon: <CheckroomOutlinedIcon /> },
    { id: 7, name: 'Vacation', icon: <HouseboatOutlinedIcon /> },
    { id: 8, name: 'Electronics and services', icon: <BlenderOutlinedIcon /> },
    { id: 9, name: 'Taxes', icon: <LocalTaxiOutlinedIcon /> },
    { id: 10, name: 'Healthcare', icon: <LocalHospitalOutlinedIcon /> },
    { id: 11, name: 'Gifts', icon: <CardGiftcardOutlinedIcon /> },
    { id: 12, name: 'Learning', icon: <SchoolOutlinedIcon /> }
];

const MinusWindowHistory: FC<IProps> = ({ open, handleClose, addHistoryItem }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
    const [accounts, setAccounts] = useState<{ id: number; name: string; balance: number; currency: string }[]>([]);
    const [amount, setAmount] = useState<number>(0);
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

    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategoryId(categoryId);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setAmount(value ? parseFloat(value) : 0);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAccountId(Number(event.target.value));
    };

    const handleDoneClick = () => {
        if (selectedAccountId !== null && amount > 0 && selectedCategoryId !== null) {
            const updatedAccounts = accounts.map(account => {
                if (account.id === selectedAccountId) {
                    return {
                        ...account,
                        balance: account.balance - amount
                    };
                }
                return account;
            });

            localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
            setAccounts(updatedAccounts);

            addHistoryItem({
                accountId: selectedAccountId,
                amount: amount,
                categoryId: selectedCategoryId,
                comment: comment
            });

            handleClose();
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={css.style}>
                <TextField
                    id="standard-select-account"
                    select
                    label="Choose an account..."
                    variant="standard"
                    style={{ width: '100%' }}
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

                <Box>
                    <Box className={css.category}>
                        <Typography variant={'h6'} color={'black'}>
                            Category: {categories.find(cat => cat.id === selectedCategoryId)?.name || 'Not chosen'}
                        </Typography>
                    </Box>
                    <Box className={css.containerIcons}>
                        {
                            categories.map(category => (
                                <Button
                                    key={category.id}
                                    style={{
                                        minWidth: '50px',
                                        backgroundColor: selectedCategoryId === category.id ? 'lightgray' : 'transparent',
                                        borderRadius: '10px',
                                        padding: '10px'
                                    }}
                                    onClick={() => handleCategoryClick(category.id)}
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
                            label="Money spent"
                            variant="standard"
                            type="number"
                            value={amount}
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
    );
};

export { MinusWindowHistory };
