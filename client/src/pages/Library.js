import * as React from 'react';
import { Box } from '@mui/material';
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Navbar from '../components/Navbar';
import SingleLibrary from '../components/SingleLibrary';

import { GET_LIBRARY_BY_ID } from "../utils/query";

export default function Library() {
    let { id } = useParams();
    const queryResult = useQuery(GET_LIBRARY_BY_ID, {
      variables: { id: id },
    });
    return (
        <Box sx={{
            display: 'flex;',
            flexDirection: 'column;',
            minHeight: '100vh;',
            bgcolor: '#272424;',
        }}>{queryResult.loading ? (
        <Box>loading...</Box>
        ) : (
            <Box>
            <Navbar username={'Example Username'} />
            <Box sx={{
                display: 'flex;',
                flexDirection: 'column;',
                minHeight: '100vh;',
                justifyContent: 'center;'
            }}>
            <SingleLibrary 
            singleLibrary={queryResult.data.getLibraryById} 
            loading={queryResult.loading}
            libraryId={id} />
            </Box>
            </Box>
            )}
        </Box>
        )
}        