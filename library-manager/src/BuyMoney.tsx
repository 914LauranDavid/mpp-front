import { Box, Typography } from "@mui/material";
import { useCatStore } from "./stores/CatStore";
import { useAuth0 } from "@auth0/auth0-react";

const BuyMoney = () => {
    const { user, getIdTokenClaims } = useAuth0();
    const { processBoughtMoney } = useCatStore();


    const handleBuySubmit = () => {
        if (user?.sub) {
            getIdTokenClaims().then(token => {
                console.log('token: ' + token);
                if (token) {
                    processBoughtMoney(token.__raw);
                }
            });
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
            backgroundColor: '#f9f9f9',
            borderRadius: 2,
            boxShadow: 3,
            maxWidth: 400,
            margin: 'auto',
            mt: 5,
            color: '#f6762a',

        }}>
            <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                Buy 🐾50
            </Typography>
            <form onSubmit={handleBuySubmit} action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="DG74KH3RS6Z98" />
                <input type="hidden" name="currency_code" value="USD" />
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" name="submit" title="PayPal – modalitatea sigură și ușoară de plată online!" alt="Cumpără acum" />
            </form>
        </Box>
    )
};

export default BuyMoney;
