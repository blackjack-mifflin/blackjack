// import {useState} from "react"
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const AddButton = ({playerInfo}) => {
  const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

        const options = [
            `${!selectedIndex ? 'Increase Balance' : ''}`,
            `${!selectedIndex ? 5 : 5}`,
            `${!selectedIndex ? 10 : 10}`,
            `${!selectedIndex ? 15 : 15}`,
            `${!selectedIndex ? 20 : 20}`,
            `${!selectedIndex ? 25 : 25}`,
            `${!selectedIndex ? 50 : 50}`,
            `${!selectedIndex ? 100 : 100}`
        ];

        const addHandler = async () => {
          console.log('Player')
          console.log(playerInfo)
        
          const id = 5
          const response = await fetch(`/api/players/add/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ balance: 0 + options[selectedIndex] }),
          });
          const result = await response.json();
          console.log(result);
        };


  const handleClick = () => {
    if(selectedIndex === 0){
      alert('Please select an amount to add ')
    } else if(confirm(`You selected ${options[selectedIndex]}. Proceed?`)){
      console.log('working')
      setSelectedIndex(0)
      addHandler(selectedIndex)
      navigate('/profile/paymentform')
    } else {
        console.log('not working')
        setSelectedIndex(0)
    }
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };


  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 0}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      </React.Fragment>
    );
}

export default AddButton
