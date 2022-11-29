import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/IosShare';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {UilEllipsisH} from "@iconscout/react-unicons"
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../actions/postAction';
import './PostDropDown.css'

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function PostCustomizedMenus({data}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {user}  = useSelector((state)=>state.authReducer.authData)
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    dispatch(deletePost(data._id,user._id));
    handleClose();
  }

  return (
    <div>
        <UilEllipsisH
            id="demo-customized-button"
            style={{cursor: "pointer"}}
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableelevation="true"
            onClick={handleClick}
            endicon={<KeyboardArrowDownIcon />}
        />
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
  
        {data.userId === user._id && 
        (<MenuItem onClick={handleClose && handleDelete} disableRipple>
              <DeleteIcon />
              Delete
        </MenuItem>)}

        {data.userId === user._id && 
        (<MenuItem onClick={handleClose} disableRipple>
              <EditIcon />
              Edit
        </MenuItem>)}

        <MenuItem onClick={handleClose} disableRipple>
          <ShareIcon />
          Share to...
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <LinkIcon />
          Copy link
        </MenuItem>
      </StyledMenu>
    </div>
  );
}