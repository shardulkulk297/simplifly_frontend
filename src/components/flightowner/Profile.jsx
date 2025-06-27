import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const loggedInUser = useSelector(state => state.UserInfo.loggedInUser);
    console.log(loggedInUser)
    return (
        <div className='container py-3'>
            <div className='row d-flex justify-content-center align-items-center'>

                <div className="w-100" style={{ maxWidth: "700px" }}>
                    <div className='card'>

                        <div className='card-header'>
                            <h4>Flight-Owner</h4>
                        </div>
                        <div className='card-body'>
                            <form action="">
                                <div className='mb-3'>
                                    <label htmlFor="">Name</label>
                                    <input type="text" className='form-control form-control-sm' disabled value={loggedInUser?.companyName} />
                                </div>
                                <div>
                                    <label htmlFor="">Email</label>
                                    <input type="text" className='form-control form-control-sm' disabled value={loggedInUser.email} />
                                </div>
                                <div>
                                    <label htmlFor="">Contact</label>
                                    <input type="text" className='form-control form-control-sm' disabled value={loggedInUser.contactPhone} />
                                </div>
                                <div>
                                    <label htmlFor="">Username</label>
                                    <input type="text" className='form-control form-control-sm' disabled value={loggedInUser.user.username} />
                                </div>
                                 <div>
                                    <label htmlFor="">Verification Status</label>
                                    <input type="text" className='form-control form-control-sm' disabled value={loggedInUser.verificationStatus} />
                                </div>
                                 <div>
                                    <label htmlFor="">Company Logo</label>
                                    <div>
                                        <img src={`/images/${loggedInUser.logoLink}`} className='rounded-circle' width={100} height={60} alt="logo" />
                                    </div>
                                    
                                </div>
                                
                            </form>

                        </div>

                    </div>


                </div>

            </div>
        </div>
    )
}

export default Profile