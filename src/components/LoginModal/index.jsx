import { useNavigate } from "react-router-dom";
import { Box, Button, Modal } from "@mui/material";
import { Google } from "@mui/icons-material";
import { doSignIn } from "api/firebase/functions";
import { PATH } from "constants";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const LoginModal = (props) => {
    const { type, open, setOpen } = props;
    const navigate = useNavigate();

    const handleClick = () => {
        (async () => {
            try {
                await doSignIn();
                return true;
            } catch(e) {
                return false;
            }
        })().then(success => {
            setOpen(false);
            if(success) navigate(`/${PATH}/${type}/table`);
            else alert('User not Authorized.');
        });
    };

    return (
        <div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>
                    <Button 
                        onClick={handleClick}
                        variant='outlined'
                        startIcon={<Google />}>
                        Sign in with Google
                    </Button>
                </Box>

            </Modal>
        </div>
    );
};

export default LoginModal;