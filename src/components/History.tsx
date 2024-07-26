import React, { FC, useEffect, useState } from 'react';
import css from '../styles/History.module.css';
import { Box, Button, Container, Typography } from "@mui/material";
import { MinusWindowHistory, PlusWindowHistory } from "./ModelsWindow";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { ICategories, IHistory } from "../interfaces";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import HouseboatOutlinedIcon from "@mui/icons-material/HouseboatOutlined";
import BlenderOutlinedIcon from "@mui/icons-material/BlenderOutlined";
import LocalTaxiOutlinedIcon from "@mui/icons-material/LocalTaxiOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MoneyIcon from "@mui/icons-material/Money";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import RedeemIcon from "@mui/icons-material/Redeem";

const categories: ICategories[] = [
    { id: 1, name: 'Groceries', icon: <LocalGroceryStoreOutlinedIcon style={{ fontSize: '70px' }} /> },
    { id: 2, name: 'Restaurant', icon: <RestaurantOutlinedIcon style={{ fontSize: '70px' }} /> },
    { id: 3, name: 'Transport', icon: <DirectionsCarFilledOutlinedIcon style={{ fontSize: '70px' }} /> },
    { id: 4, name: 'Home', icon: <HomeWorkOutlinedIcon style={{ fontSize: '70px' }} /> },
    { id: 5, name: 'Pets', icon: <PetsOutlinedIcon style={{ fontSize: '70px' }} /> },
    { id: 6, name: 'Clothes and shoes', icon: <CheckroomOutlinedIcon style={{ fontSize: '70px' }} /> },
    { id: 7, name: 'Vacation', icon: <HouseboatOutlinedIcon style={{ fontSize: '70px' }} /> },
    { id: 8, name: 'Electronics and services', icon: <BlenderOutlinedIcon style={{ fontSize: '70px' }} /> },
    { id: 9, name: 'Taxes', icon: <LocalTaxiOutlinedIcon style={{ fontSize: '70px' }} /> },
    { id: 10, name: 'Healthcare', icon: <LocalHospitalOutlinedIcon style={{ fontSize: '70px' }} /> },
    { id: 11, name: 'Gifts', icon: <CardGiftcardOutlinedIcon style={{ fontSize: '70px' }} /> },
    { id: 12, name: 'Learning', icon: <SchoolOutlinedIcon style={{ fontSize: '70px' }} /> },
    { id: 13, name: 'Salary', icon: <MoneyIcon style={{ fontSize: '70px' }} /> },
    { id: 14, name: 'Interest', icon: <AccountBalanceIcon style={{ fontSize: '70px' }} /> },
    { id: 15, name: 'Refunds', icon: <HandshakeOutlinedIcon style={{ fontSize: '70px' }} /> },
    { id: 16, name: 'Gifts', icon: <RedeemIcon style={{ fontSize: '70px' }} /> }
];

const History: FC = () => {
    const [openPlus, setOpenPlus] = useState<boolean>(false);
    const [openMinus, setOpenMinus] = useState<boolean>(false);
    const [history, setHistory] = useState<IHistory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedHistory = localStorage.getItem('history');
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
        }
        setLoading(false);
    }, []);

    const handleOpenPlus = () => setOpenPlus(true);
    const handleClosePlus = () => setOpenPlus(false);

    const handleOpenMinus = () => setOpenMinus(true);
    const handleCloseMinus = () => setOpenMinus(false);

    const addHistoryItem = (item: IHistory) => {
        setHistory(prevHistory => {
            const newHistory = [...prevHistory, item];
            localStorage.setItem('history', JSON.stringify(newHistory));
            return newHistory;
        });
    };

    const deleteHistoryItem = (index: number) => {
        setHistory(prevHistory => {
            const newHistory = prevHistory.filter((_, i) => i !== index);
            localStorage.setItem('history', JSON.stringify(newHistory));
            return newHistory;
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    console.log(history)
    return (
        <Container className={css.container}>
            <Box className={css.blockInfo}>
                {history.length === 0 ? (
                    <>
                        <h1>There is nothing here yet...</h1>
                        <h1>Use button below to add expenses and incomes...</h1>
                    </>
                ) : (
                    history.map((item, index) => {
                        const category = categories.find(cat => cat.name === item.categoryName);
                        const formattedAmount = item.amount >= 0 ? `+${item.amount}` : `${item.amount}`;

                        return (
                            <Box key={index} className={css.historyItem}>
                                {category && <Box className={css.icon}>{category.icon}</Box>}
                                <Box display="flex" width="100%">
                                    <Box width="50%" display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                                        <Typography>
                                            Account: {item.accountName}
                                        </Typography>
                                        <Typography>Comment: {item.comment}</Typography>
                                    </Box>

                                    <Box width="50%" display="flex" justifyContent="flex-end" alignItems="center">
                                        <Typography>{formattedAmount}</Typography>
                                    </Box>
                                    <Box className={css.changeButtons}>
                                        <Button onClick={() => deleteHistoryItem(index)}>
                                            <DeleteOutlinedIcon style={{ fontSize: '20px' }} />
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        );
                    })
                )}
            </Box>
            <Box className={css.groupButton}>
                <Button variant="contained" onClick={handleOpenPlus}>+$</Button>
                <Button variant="contained" onClick={handleOpenMinus}>-$</Button>
            </Box>

            <PlusWindowHistory open={openPlus} handleClose={handleClosePlus} addHistoryItem={addHistoryItem} />
            <MinusWindowHistory open={openMinus} handleClose={handleCloseMinus} addHistoryItem={addHistoryItem} />
        </Container>
    );
};

export { History };
