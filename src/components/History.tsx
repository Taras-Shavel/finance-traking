import React, { FC, useState } from 'react';
import css from '../styles/History.module.css';
import { Box, Button, Container, Typography } from "@mui/material";
import { MinusWindowHistory, PlusWindowHistory } from "./ModelsWindow";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface IHistoryItem {
    accountId: number;
    amount: number;
    categoryId: number;
    comment: string;
}

const History: FC = () => {
    const [openPlus, setOpenPlus] = useState<boolean>(false);
    const [openMinus, setOpenMinus] = useState<boolean>(false);
    const [history, setHistory] = useState<IHistoryItem[]>([]);

    const handleOpenPlus = () => setOpenPlus(true);
    const handleClosePlus = () => setOpenPlus(false);

    const handleOpenMinus = () => setOpenMinus(true);
    const handleCloseMinus = () => setOpenMinus(false);

    const addHistoryItem = (item: IHistoryItem) => {
        setHistory(prevHistory => [...prevHistory, item]);
    };

    return (
        <Container className={css.container}>
            <Box className={css.blockInfo}>
                {history.length === 0 ? (
                    <>
                        <h1>There is nothing here yet...</h1>
                        <h1>Use button below to add expenses and incomes...</h1>
                    </>
                ) : (
                    history.map((item, index) => (
                        <Box key={index} className={css.historyItem}>
                            <Box className={css.icon}></Box>

                            <Box display="flex" width="100%">
                                <Box width="50%" display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                                    <Typography>
                                        <DeleteOutlinedIcon style={{ fontSize: '20px' }} />
                                        delete
                                    </Typography>
                                    <Typography>Comment: {item.comment}</Typography>
                                </Box>

                                <Box width="50%" display="flex" justifyContent="flex-end" alignItems="center">
                                    <Typography>Amount: {item.amount}</Typography>
                                </Box>


                            </Box>
                        </Box>
                    ))
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