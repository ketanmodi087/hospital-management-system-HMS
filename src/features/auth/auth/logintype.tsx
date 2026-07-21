import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Radio, RadioGroup, FormControlLabel, Link } from '@mui/material';
import Amplify from 'aws-amplify';
import { apiSetting } from "aws-export";
import { useAppDispatch } from "../../store/store";
import { setLoginwithtype } from "../../store/thunk/commonThunk";


export default function LoginType(props: any) {
    const { page } = props;
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [loginwith, setLoginwith] = useState('qa')
    const hendleLoginWithType = (event: any) => {
        let type = event.target.value
        setLoginwith(type)

    }
    useEffect(() => {
          Amplify.configure(apiSetting);
        dispatch(setLoginwithtype(loginwith))
    }, [loginwith])

    return (

        <div style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
        }}>
            <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
            >
                <FormControlLabel value="dev" checked={loginwith == 'dev' ? true : false} control={<Radio onChange={(e) => hendleLoginWithType(e)} />} label="Dev" />
                <FormControlLabel value="qa" checked={loginwith == 'qa' ? true : false} control={<Radio onChange={(e) => hendleLoginWithType(e)} />} label="Qa" />
            </RadioGroup>
            {page == 'login' ?
                <Link onClick={() => navigate("/forgetPassword")} variant="body2" sx={{ pl: 10 }}>
                    Forgot password?
                </Link>
                :
                <Link onClick={() => navigate("/login")} variant="body2" sx={{ pl: 10 }}>
                    Back to login
                </Link>
            }
        </div>
    )
}