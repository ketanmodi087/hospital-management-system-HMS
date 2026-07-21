import React from 'react'
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

type Props = {
    signInWithFederatedProvider: (type: string) => void;
    setStep: React.Dispatch<React.SetStateAction<number | string>>
}

const SingleSignOn = ({ signInWithFederatedProvider, setStep }: Props) => {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    marginTop: "15px",
                    flexDirection: "column",
                    padding: '24px'
                }}
            >
                <img
                    src={"/assets/images/google.png"}
                    style={{ marginTop: "16px", cursor: "pointer" }}
                    alt=""
                    width={250}
                    onClick={() => signInWithFederatedProvider("Google")}
                />
                <img
                    src={"/assets/images/apple.png"}
                    style={{ marginTop: "16px", cursor: "pointer" }}
                    alt=""
                    width={250}
                    onClick={() => signInWithFederatedProvider("SignInWithApple")}
                />
                <Box sx={{ userSelect: 'none', fontSize: '16px', width: "250px", height: '50px', marginTop: "16px", cursor: "not-allowed", border: '1px solid black', borderRadius: '5px', boxShadow: '2px 2px #888888', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', color: 'black', fontWeight: 'bold' }}>
                    Enterprise SSO
                </Box>
                <Link sx={{ marginTop: '8px',fontSize:'1rem',fontWeight:'bolder' }} onClick={() => setStep(1)} variant="body2">
                    Back to sign in
                </Link>
            </div >
        </>
    )
}

export default SingleSignOn