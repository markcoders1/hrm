import { useEffect, useState } from 'react'
import '../PagesCss/Profile.css'
import axiosInstance from '../auth/axiosInstance';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import {Loader} from '../components/Loaders';



const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const Profile = () => {
    const navigate=useNavigate()
    const [yourData, setYourData] = useState([]);
    const [loading, setloading] = useState(true)
    const setHeadertext = useOutletContext()

    useEffect(() => {
        const getProfileInfo = async () => {
            try {
                const response = await axiosInstance({
                    url: `${apiUrl}/api/getUser`,
                    method: "get",

                });
                console.log(response.data.user);
                setYourData(response.data.user)
                setloading(false)

            } catch (error) {
                console.log(error)
            }
        }

        getProfileInfo()
        setHeadertext('User Profile')
    }, [])



    return (
        <div className='profile-container' >
            <div className={loading ? "profile-information-container" :"profile-information-container padding"}>
                {loading ? <div className='loaderContainer'><Loader /></div>:
                    <>
                        <div className="input">
                            <div className='input-label'>First Name : </div><div className='input-box'>{`  ${yourData.firstName}`}</div>
                        </div>
                        <div className="input">
                            <div className='input-label'>Last Name : </div><div className='input-box'>{`  ${yourData.lastName}`}</div>
                        </div>
                        <div className="input">
                            <div className='input-label'>Email : </div><div className='input-box'>{`  ${yourData.email}`}</div>
                        </div>
                        <div className="input">
                            <div className='input-label'>Phone : </div><div className='input-box'>{`  ${yourData.phone}`}</div>
                        </div>
                        <div className="input">
                            <div className='input-label'>Department : </div><div className='input-box'>{`  ${yourData.department}`}</div>
                        </div>
                        <div className="input">
                            <div className='input-label'>Designation : </div><div className='input-box'>{`  ${yourData.designation}`}</div>
                        </div>

                        <div className="input">
                            <div className='input-label'>Shift : </div><div className='input-box'>{`  ${yourData.shift}`}</div>
                        </div>
                        <div className="input">
                            <div className='input-label'>Team Lead : </div><div className='input-box'>{`  ${yourData.teamLead}`}</div>
                        </div>
                        <div className="input">
                            <div className='input-label'>Status : </div><div className='input-box'>{`  ${yourData.status}`}</div>
                        </div>
                        <div className="input pwd-btn" onClick={()=>navigate('/changepassword')}>
                            Change Password
                        </div>
                    </>}


            </div>



        </div>
    )
}

export default Profile