import React, { useState } from 'react'
// import ImageUpload from './ImageUpload'

const Profile = () => {
    async function handleProfile(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('img', e.target.files[0])
            const response = await fetch('http://www.localhost:4000/api/photo', {
                method: 'POST',
                body: formData
            })
            if (!response.ok) {
                throw new Error("FAILED...")
            }
            const data = await response.json()
            return data
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="w-screen md:w-2/4 border-white">
            <div className="h-12 w-full border border-t-0 flex items-center px-4">
                <div className="font-bold">Profile</div>
            </div>
            <div className="h-full border border-t-0">
                {/* <ImageUpload /> */}
                <form onSubmit={handleProfile} enctype="multipart/form-data">
                    <div>test</div>
                    <input type="file" name="image" required />
                    <button type="submit">Update Profile Pic</button>
                </form>
            </div>
        </div>
    )
}
{/* <input onChange={(e) => setImageFile(e.target.files[0])} type="file" accept=".png, .jpeg, .jpg" />
    <img src={imageFile} alt="Uploaded" /> */}
export default Profile