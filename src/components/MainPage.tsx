import React, {FC} from 'react';
import {Box, Container} from "@mui/material";

import css from '../styles/MainPage.module.css'

const MainPage: FC = () => {
    return (
        <Container className={css.container}>
            <Box className={css.blockInfo}>
                <h1>Welcome to Finance</h1>
                <p>
                    Welcome to our finance tracking site, where managing your money becomes simple and clear. We offer
                    state-of-the-art tools to track income, expenses and investments so you can focus on achieving your
                    financial goals.
                </p>
            </Box>
        </Container>
    );
};

export {MainPage};