import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const usePasswordToggle = () => {
    const [visible, setVisible] = useState(false);
    const inputType = visible ? 'text' : 'password'

    function handleClick() {
        setVisible(!visible);
    }

    const icon = (
        <span onClick={handleClick}>
            {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </span>
    )

    return [inputType, icon];
}

export default usePasswordToggle
