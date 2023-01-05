import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";

function ProfileModal({modalOpened, setModalOpened, data}) {
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);
  const {password, ...other} = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage]= useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onImageChange = (event) => {
    if(event.target.files && event.target.files[0]){
      let img = event.target.files[0];
      event.target.name === "profileImage" ? setProfileImage(img) : setCoverImage(img);
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      let UserData = formData;

      let res1;
      if(profileImage){
        const ProfileData = new FormData();
        ProfileData.append("file", profileImage);
        ProfileData.append('upload_preset', 'socialmedia');
        ProfileData.append('cloud_name', "princedhameliya")

        await fetch('https://api.cloudinary.com/v1_1/princedhameliya/image/upload',{
            method: "POST",
            body: ProfileData,
        })
        .then(res => res.json())
        .then(async res => {
            res1 = await res;
        })
        .catch(err => console.log(err))
        // try {
        //   dispatch(uploadImage(data));
        // } catch (error) {
        //   console.log(error);
        // }
      }
      if(res1 && profileImage) UserData.profilePicture = res1.url;

      let res2;
      if(coverImage){
        const ProfileData = new FormData();
        ProfileData.append("file", coverImage);
        ProfileData.append('upload_preset', 'socialmedia');
        ProfileData.append('cloud_name', "princedhameliya")

        await fetch('https://api.cloudinary.com/v1_1/princedhameliya/image/upload',{
            method: "POST",
            body: ProfileData,
        })
        .then(res => res.json())
        .then(async res => {
          res2 = await res;
        })
        .catch(err => console.log(err))
        // try {
          //   dispatch(uploadImage(data));
          // } catch (error) {
            //   console.log(error);
            // }
      }
      if(res2 && coverImage) UserData.coverPicture = res2.url;
      dispatch(updateUser(param.id, UserData));
      setLoading(false);
      setModalOpened(false);
  }

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[10]}
      overlayOpacity={0.55}
      overlayBlur={0}
      size="55%"
      opened={modalOpened}
      onClose={()=>setModalOpened(false)}
    >
      <form className="InfoForm">
        <h3>Your Info</h3>
        <div>
          <input type="text" className="InfoInput" name="firstname" placeholder="First Name" onChange={handleChange} value={formData.firstname} />
          <input type="text" className="InfoInput" name="lastname" placeholder="Last Name" onChange={handleChange} value={formData.lastname} />
        </div>

        <div>
          <input type="text" className="InfoInput" name="bio" placeholder="Bio" onChange={handleChange} value={formData.bio} />
          <input type="text" className="InfoInput" name="worksAt" placeholder="Work at" onChange={handleChange} value={formData.worksAt} />
        </div>

        <div>
          <input type="text" className="InfoInput" name="livesin" placeholder="Lives In" onChange={handleChange} value={formData.livesin} />
          <input type="text" className="InfoInput" name="country" placeholder="Country" onChange={handleChange} value={formData.country} />
        </div>

        <div>
          <input type="text" className="InfoInput" name="relationship" placeholder="Relationship Status" onChange={handleChange}  value={formData.relationship} />
        </div>

        <div>
          Profile Image
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover Image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <button className="button InfoButton" onClick={handleSubmit} disabled={loading}>{loading ? "Updating" : "Update"}</button>
      </form>
    </Modal>
  );
}

export default ProfileModal