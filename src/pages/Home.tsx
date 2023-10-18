import { useState, useEffect } from "react";
import UnsplashApiCalls from "../utils/unsplashApiCalls";
import PhotoCatalogBox from "../components/PhotoCatalogBox";
import PhotoCatalogInterface from "../interface/photoCatalogInterface";
import PopupModal from "../components/PopupModal";
import PhotoModalContext from "../context/photoModalContext";

const Home = ():JSX.Element => {
    const [open, setOpen] = useState(false);
    const [photoList, setPhotoList] = useState([]);
    const [photoDetail, setPhotoDetail] = useState({});

    const getMusicList = async ()=>{
        let getPhotosList = new UnsplashApiCalls();
        let unsplashResponse = await getPhotosList.getRequest(`/photos/random?count=32`);
        setPhotoList(unsplashResponse);
        localStorage.setItem("allPhotos", JSON.stringify(unsplashResponse));
    }

    useEffect(()=>{
        const allPhotos = localStorage.getItem("allPhotos");
        if(allPhotos && allPhotos!=="undefined"){
            setPhotoList(JSON.parse(allPhotos));
            console.log(JSON.parse(allPhotos));
        }else{
            getMusicList();
        }
    }, []);

    return (
        <PhotoModalContext.Provider value={{open, setOpen, photoDetail, setPhotoDetail}}>
        <div>
            <PopupModal />
            <div className="">
                <div className="fs-4 ms-3 semi-bold">Random Photos</div>
                <div className="d-flex">
                    <button onClick={()=>getMusicList()} className="btn-dark mx-auto">Suffle</button>
                </div>
                <div style={{"flexWrap": "wrap"}} className="m-5 d-flex">
                    {
                        (photoList.length!==0) && 
                        photoList.map((eachPhoto:any)=> {
                            let photoDetails:PhotoCatalogInterface = {
                                open: false,
                                key: eachPhoto?.id,
                                photoTitle: eachPhoto?.title,
                                photoImg: eachPhoto?.urls?.thumb,
                                photoDesc: eachPhoto?.alt_description,
                                likeCount: eachPhoto?.likes,
                                photoUrl: eachPhoto?.urls?.full,
                                userName: eachPhoto?.user?.username,
                                nameOfUser: eachPhoto?.user?.name,
                                userProfileImage: eachPhoto?.user?.profile_image?.medium,
                                twitterUsername: eachPhoto?.user?.social?.twitter_username,
                                instagramUsername: eachPhoto?.user?.social?.instagram_username
                            };
                            return (
                                <PhotoCatalogBox key={eachPhoto?.id} photoDetails={photoDetails} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
        </PhotoModalContext.Provider>
    );
}

export default Home;