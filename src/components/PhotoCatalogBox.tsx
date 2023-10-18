import PhotoCatalogInterface from "../interface/photoCatalogInterface";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import PhotoModalContext from "../context/photoModalContext";
import { useContext } from "react";

interface PhotoCatalogBoxProps {
    photoDetails: PhotoCatalogInterface;
}

const PhotoCatalogBox = ({ photoDetails }:PhotoCatalogBoxProps):JSX.Element => {
    let{ setOpen, photoDetail, setPhotoDetail } = useContext(PhotoModalContext);
    const handleOpen = () => {
        photoDetail = photoDetails;
        setPhotoDetail({...photoDetail});
        console.log(`photoDetail: ${JSON.stringify(photoDetail)} ${photoDetails.key}`);
        setOpen(true);
    }

    return (
        <div onClick={handleOpen} className="song-catalog neon-glow m-4" key={photoDetails.key}>
            <div className="heart-icon-box">
                <FaHeart 
                    id={photoDetails.key}
                    className={`heart-icon text-danger`}
                />
                <div className="mt-4 text-center small-text">{photoDetails.likeCount}</div>
            </div>
            <div className="w-100 h-auto d-flex justify-content-center">
                <img src={photoDetails.photoImg} className="song-img" alt={photoDetails.photoTitle} />
            </div>
            <div className="my-3">
                <Link to={photoDetails.photoUrl} target="_blank">
                    <h5 className="text-primary">
                        {photoDetails.photoTitle}
                    </h5>
                </Link>
                <p className="text-secondary" title={photoDetails.userName}>
                    @{photoDetails.userName}
                </p>
                <p className="text-truncate mt-2" title={photoDetails.photoDesc}>
                    {photoDetails.photoDesc}
                </p>
            </div>
        </div>
    );
}

export default PhotoCatalogBox;