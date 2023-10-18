import { useState, useEffect } from "react";
import UnsplashApiCalls from "../utils/unsplashApiCalls";
// import sampleSongImg from "../assets/sampleSongImg.jpg";
import PhotoCatalogBox from "../components/PhotoCatalogBox";
import PhotoCatalogInterface from "../interface/photoCatalogInterface";
import PhotoModalContext from "../context/photoModalContext";
import PopupModal from "../components/PopupModal";


const Search = ():JSX.Element => {

    const [open, setOpen] = useState(false);
    const [photoList, setPhotoList] = useState([]);
    const [photoDetail, setPhotoDetail] = useState({});

    const searchPhotos = async (search:string) => {
        let getPhotosList = new UnsplashApiCalls();
        let unsplashResponse = await getPhotosList.getRequest(`/search/photos?query=${search}`);
        if(unsplashResponse && unsplashResponse?.results[0]) {
            console.log(unsplashResponse?.results);
            setPhotoList(unsplashResponse?.results);
        }
    }

    // Function to debounce search input
    function debounceSearch() {
        // Set a delay time (in milliseconds) for debouncing
        const debounceDelay = 1000; // 300ms delay before triggering the search
        let timeoutId:any;
        return (event:React.KeyboardEvent) => {
            console.log((event.target as HTMLInputElement).value);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                searchPhotos((event.target as HTMLInputElement).value);
            }, debounceDelay);
        };
    }

    const processSearch = debounceSearch();

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
                <div className="fs-4 ms-3 semi-bold">Search Photos</div>
                <div className="d-flex">
                    <input type="text" placeholder="Search" onKeyUp={(e:React.KeyboardEvent)=>processSearch(e)} className="mx-auto w-50 mt-5 search-bar" />
                    {/* <button onClick={()=>getMusicList()} className="btn-dark mx-auto">Suffle</button> */}
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

export default Search;