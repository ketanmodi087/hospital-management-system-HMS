import { Alert, AlertTitle, Box, Button, Grid, TextField, Typography } from '@mui/material'
interface Props {
    navigate: any
}
export default function TempSentPasswordScreen({ navigate }: Props) {
    return (
        <Box
            sx={{
                mt: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // maxWidth: "500px",
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Alert severity="success">
                            <AlertTitle>Temporary Password Sent</AlertTitle>
                            Temporary password sent to your email, Use this password to signIn and reset your new password.
                            Please go back to signIn.
                        </Alert>
                    </Box>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Button variant='contained' onClick={() => navigate("/login")}>
                            Back to SignIn
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
