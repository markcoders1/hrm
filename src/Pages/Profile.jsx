import { useEffect, useState } from 'react'
import '../PagesCss/Profile.css'
import axiosInstance from '../auth/axiosInstance';
import { NavLink, useOutletContext } from 'react-router-dom';
import Loader from '../components/Loader';



const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const Profile = () => {
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
                        <div className="input-box">
                            <label >First Name : <span>{yourData.firstName}</span> </label>
                        </div>
                        <div className="input-box">
                            <label >Last Name : <span>{yourData.lastName}</span> </label>
                        </div>
                        <div className="input-box">
                            <label >Email : <span>{yourData.email}</span> </label>
                        </div>
                        <div className="input-box">
                            <label >Phone : <span>{yourData.phone}</span> </label>
                        </div>
                        <div className="input-box">
                            <label >Department : <span>{yourData.department}</span> </label>
                        </div>
                        <div className="input-box">
                            <label >Designation : <span>{yourData.designation}</span> </label>
                        </div>

                        <div className="input-box">
                            <label >Shift : <span>{yourData.shift}</span> </label>
                        </div>
                        <div className="input-box">
                            <label >Team Lead : <span>{yourData.teamLead}</span> </label>
                        </div>
                        <div className="input-box">
                            <label >Status : <span>{yourData.status}</span> </label>
                        </div>
                        <NavLink to='/changepassword' className="input-box">
                            <label id='changePassword' >Change Password</label>
                        </NavLink>
                    </>}


            </div>



        </div>
    )
}

export default Profile