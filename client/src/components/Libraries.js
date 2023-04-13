import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Box,
    Menu,
    MenuItem,
} from '@mui/material';


export default function Libraries({ libraries }) {
    const [openDialog, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleCloseDialog = () => {
      setOpen(false);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        {library.name}
                    </Button>
                    <Menu
                        sx={{
                            bgcolor: 'black;',
                            opacity: 0.3
                        }}
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={handleClose} href={library._id} component={Button}>Open Library</MenuItem>
                        <MenuItem onClick={handleClickOpen} component={Button}>Edit Library Name</MenuItem>
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
                        <MenuItem onClick={handleClose} component={Button}>Delete Library</MenuItem>
                    </Menu>
                </Box>
            })}

        </Box>
    )
}