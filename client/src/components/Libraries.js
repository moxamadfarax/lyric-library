import * as React from 'react';
import Button from '@mui/material/Button';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import {
    Box,
    Menu,
    MenuItem,
} from '@mui/material';


export default function Libraries({ libraries }) {
    const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
    const openMenu = Boolean(menuAnchorEl);
    const handleClickMenu = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setMenuAnchorEl(null);
    };
    const [openDialog, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleCloseDialog = () => {
      setOpen(false);
    };

    return (
        <Box sx={{
            display: 'flex;',
            alignItems: 'center;',
            flexDirection: 'column;',
            bgcolor: '#272424;',
            justifyContent: 'center;',
            flex: '1;'
        }}>
            <Box sx={{
                color: 'white;',
                marginBottom: '10vh;',
                fontSize: '40px;'
            }}>Welcome User, these are your libraries</Box>
            <Box sx={{
                borderRadius: '10px',
                padding: '20px',
                color: '#1DB954',
                bgcolor: '#1D1B1B;',
                marginBottom: '20px',
                fontSize: '30px'
            }}>My libraries</Box>
            {libraries.map((library) => {
                return <Box key={library.id} sx={{
                    display: 'flex;',
                    alignItems: 'center;'
                }}>
                    <Button
                        sx={{
                            color: 'white;',
                            marginBottom: '10px;',
                            bgcolor: '#1D1B1B;',
                            width: '30vw',
                            display: 'flex;',
                            alignItems: 'center;'
                        }}
                        href={library._id}
                    >
                        {library.name}
                    </Button>
                    <IconButton
                        id="positioned-demo-button"
                        aria-controls={openMenu ? 'positioned-demo-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? 'true' : undefined}
                        variant="outlined"
                        color="neutral"
                        onClick={handleClickMenu}
                        placement="bottom"
                    >
                        <MoreVert />
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'top'}}>
                        <Menu
                            id="positioned-demo-menu"
                            anchorEl={menuAnchorEl}
                            open={openMenu}
                            onClose={handleCloseMenu}
                            aria-labelledby="positioned-demo-button"
                        >
                            <MenuItem onClick={handleClickOpen}>
                                <ListItemDecorator>
                                    <Edit />
                                </ListItemDecorator>{' '}
                                Rename Library
                            </MenuItem>
                            <Dialog open={openDialog} onClose={handleCloseDialog}>
                            <DialogTitle>Edit Library</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Please enter your new library name:
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="library"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog}>Cancel</Button>
                                <Button onClick={handleCloseDialog}>Subscribe</Button>
                            </DialogActions>
                        </Dialog>
                            <ListDivider />
                            <MenuItem onClick={handleCloseMenu} variant="soft" color="danger">
                                <ListItemDecorator sx={{ color: 'inherit', }}>
                                    <DeleteForever />
                                </ListItemDecorator>{' '}
                                Delete Library
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            })}

        </Box>
    )
}