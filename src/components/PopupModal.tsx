import { Modal, Box, Typography } from "@mui/material";
import PhotoModalContext from "../context/photoModalContext";
import { useContext } from "react";
import { FaHeart, FaInstagram, FaTwitter } from "react-icons/fa";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 800,
    bgcolor: 'var(--secondary-bg)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const PopupModal = () => {
    const { open, setOpen, photoDetail } = useContext(PhotoModalContext);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="heart-icon-box">
                        <FaHeart
                            id='1'
                            className={`heart-icon text-danger`}
                        />
                        <div className="mt-4 text-center text-white small-text">{photoDetail?.likeCount}</div>
                    </div>
                    <div className="w-100 h-auto d-flex justify-content-center">
                        <img
                            src={photoDetail?.photoUrl}
                            className="full-img" alt="testImg"
                        />
                    </div>
                    <div className="my-3">
                        <h5 className="text-primary">
                            {photoDetail?.photoTitle}
                        </h5>
                        <div className="d-flex">
                            <div>
                                <img className="rounded-circle me-3" src={photoDetail?.userProfileImage} alt="" />
                            </div>
                            <div className="mt-2">
                                <div className="text-white">{photoDetail?.nameOfUser}</div>
                                <div className="text-secondary">
                                    @{photoDetail?.userName}
                                </div>
                            </div>
                        </div>

                        <div className="d-flex my-4">
                            <a href={`https://instagram.com/${photoDetail?.instagramUsername}`} 
                                target="_blank" rel="noopener noreferrer">
                                <FaInstagram
                                    id='1'
                                    className={`fs-2 text-danger cursor-pointer`}
                                />
                            </a>
                            <a className="ms-3" href={`https://twitter.com/${photoDetail?.twitterUsername}`} 
                                target="_blank" rel="noopener noreferrer">
                                <FaTwitter
                                    id='1'
                                    className={`fs-2 text-primary cursor-pointer`}
                                />
                            </a>
                        </div>

                        <Typography
                            className="text-truncate text-white" title={photoDetail?.photoDesc}
                            id="modal-modal-description"
                            sx={{ mt: 2 }}>
                            {photoDetail?.photoDesc}.
                        </Typography>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default PopupModal;