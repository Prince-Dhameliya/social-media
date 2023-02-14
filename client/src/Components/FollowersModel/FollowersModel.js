import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import '../FollowingModel/FollowingModel.css'
import Close from '../../img/Close.svg'
import { FollowerVertical } from '../FollowerCardVertical/FollowerCardVertical';

export default function FollowersModel({open, setOpen, persons, currentUser}) {
//   const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="FollowingModel">
            <div className="FollowingModelTitleSection">
                <span className='FollowingModelTitle'>Followers</span>
                <div className="FollowingModelClose">
                <img src={Close} className='ReactLike' alt="" style={{cursor: "pointer",width: "26px"}} onClick={handleClose} />
                </div>
            </div> 
            <hr />

            <div className="FollowingModelList">
            {persons.map((person, id)=>{
                if(currentUser.followers.includes(person._id)){
                    return <FollowerVertical person={person} key={id} />
                }
                return null;
            })}
        </div>
        </div>
      </Dialog>
    </div>
  );
}