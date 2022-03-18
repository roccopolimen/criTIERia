import { useContext, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    ImageList,
    ImageListItem,
    TextField
} from '@mui/material';
import noImage from 'images/noImage.png';
import { useParams } from 'react-router-dom';
import { dataContext } from 'context';
import { changeImage } from 'api/gist';

const ImageModal = (props) => {
    const { title, currentImage, close } = props;
    const [imageUrl, setImageUrl] = useState('');
    const { type } = useParams();
    const { data, updateData } = useContext(dataContext);

    const handleImageChangeRequest = () => {
        (async () => {
            const newData = await changeImage(title, type, data, imageUrl);
            updateData(newData);
            close();
        })();
    };

    return (
        <Dialog 
            open
            onClose={close}
        >
            <DialogTitle>Change {title} Image</DialogTitle>
            <DialogContent>
                <ImageList cols={2}>
                    <ImageListItem>
                        <img
                            src={currentImage}
                            alt='current'
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = noImage;
                            }}
                        />
                    </ImageListItem>
                    <ImageListItem>
                        <img
                            src={imageUrl}
                            alt='new preview'
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = noImage;
                            }}
                        />
                    </ImageListItem>
                </ImageList>
                <TextField
                    autoFocus
                    margin="dense"
                    id="Image URL"
                    label="Image URL"
                    fullWidth
                    variant="standard"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter') {
                            handleImageChangeRequest();
                            close();
                        }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button onClick={handleImageChangeRequest}>Change</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ImageModal;