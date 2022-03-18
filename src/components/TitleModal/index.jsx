import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import ScoreModal from 'components/ScoreModal';

const TitleModal = ({ open, setOpen }) => {
    const [title, setTitle] = useState('');
    const [openNext, setOpenNext] = useState(false);

    return (
        <div>
        <Dialog 
            open={open}
            onClose={() => {
                setTitle('');
                setOpen(false);
            }}
        >
            <DialogTitle>Add New</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="Title"
                    label="Title"
                    fullWidth
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter') {
                            setOpen(false);
                            setOpenNext(true);
                        }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setTitle('');
                    setOpen(false);
                }}>Cancel</Button>
                <Button onClick={() => {
                    setOpen(false);
                    setOpenNext(true);
                }}>Next</Button>
            </DialogActions>
        </Dialog>
        {openNext && 
        <ScoreModal 
            title={title}
            setTitle={setTitle}
            pSetOpen={setOpen}
            open={openNext}
            setOpen={setOpenNext}
            add
        />}
        </div>
    );
}

export default TitleModal;