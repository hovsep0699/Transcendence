import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux';
import { useNavigate } from 'react-router-dom';
import { SetStatus } from './Ft_Auth';

function Out() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
  const user = useSelector((state: AppState) => state.user);

    useEffect(()=>{
        SetStatus(user.id,0)
        dispatch(setUser(null));
        navigate("/",{replace:true})
        
    },[])
  return (
    <div>Out</div>
  )
}

export default Out