import React, {FC} from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

import css from '../styles/Header.module.css'
import {useNavigate} from "react-router-dom";

const Header: FC = () => {
    let navigate = useNavigate();
    return (
        <AppBar position="static" className={css.container}>
            <Toolbar>

                <Typography variant="h6"
                            onClick={() => navigate('/')}
                            style={{cursor: 'pointer'}}
                >
                    Finance
                </Typography>

                <Box className={css.links}>

                    <Button color="inherit" className={css.item}
                            onClick={() => navigate('/money')}
                    >
                        <AccountBalanceWalletOutlinedIcon/>
                        Money
                    </Button>

                    <Button color="inherit" className={css.item}
                            onClick={() => navigate('/history')}
                    >
                        <FormatListBulletedOutlinedIcon/>
                        History
                    </Button>

                    <Button color="inherit" className={css.item}
                            onClick={() => navigate('/budgets')}
                    >
                        <CalculateOutlinedIcon/>
                        Budgets
                    </Button>

                    <Button color="inherit" className={css.item}
                            onClick={() => navigate('/statistics')}
                    >
                        <InsertChartOutlinedIcon/>
                        Statistics
                    </Button>

                </Box>
            </Toolbar>
        </AppBar>
    );
};

export {Header};