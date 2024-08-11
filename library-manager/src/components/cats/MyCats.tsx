import {
    Box,
    Button,
    Divider,
    Typography,
    Card,
    CardContent,
    CardMedia
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCatStore } from "../../stores/CatStore";
import { useAuth0 } from "@auth0/auth0-react";
import SillyLoading from "../utilities/SillyLoading";
import { Cat } from "../../domain/Cat";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function CatsTable() {
    const { user, getIdTokenClaims } = useAuth0();
    const { getMyCats } = useCatStore();
    const [didLoadCats, setDidLoadCats] = useState(false);
    const [myCats, setMyCats] = useState<Cat[]>([]);

    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const isMd = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        console.log('will get claims');

        getIdTokenClaims().then(tokenClaims => {
            if (tokenClaims !== undefined) {
                const token = tokenClaims.__raw;

                getMyCats(token).then(receivedCats => {
                    setMyCats(receivedCats);
                    setDidLoadCats(true);
                });
            }
        });
    }, [user]);

    let centerSlidePercentage = 33.33;
    if (isXs) {
        centerSlidePercentage = 100;
    } else if (isSm) {
        centerSlidePercentage = 50;
    } else if (isMd) {
        centerSlidePercentage = 50;
    }

    return (
        <Box sx={{ padding: 3 }}>
            {didLoadCats ? (
                <Carousel
                    showArrows
                    showThumbs={false}
                    autoPlay={false}
                    showStatus={false}
                    infiniteLoop
                    centerMode={true}
                    centerSlidePercentage={centerSlidePercentage}
                    renderArrowPrev={(onClickHandler, hasPrev) =>
                        hasPrev && (
                            <Button
                                onClick={onClickHandler}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '1%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 2,
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    color: 'white',
                                    padding: '10px',
                                    fontSize: 18,
                                }}
                            >
                                Prev
                            </Button>
                        )
                    }
                    renderArrowNext={(onClickHandler, hasNext) =>
                        hasNext && (
                            <Button
                                onClick={onClickHandler}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '1%',
                                    transform: 'translateY(-50%)',
                                    zIndex: 2,
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    color: 'white',
                                    padding: '10px',
                                    fontSize: 18,
                                }}
                            >
                                Next
                            </Button>
                        )
                    }
                >
                    {myCats.map((cat) => (
                        <Link to={`/my-cats/${cat.id}`} style={{ textDecoration: "none", color: "inherit" }} key={cat.id}>
                            <Box sx={{ padding: '0 10px' }}>
                                <Card sx={{ margin: 'auto', padding: 2, mb: 1, height: '100%' }}>
                                    {(cat.avatarUrl && cat.avatarUrl !== "") &&
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={cat.avatarUrl}
                                            alt="Cat Avatar"
                                            sx={{ objectFit: 'cover', height: 'auto', maxHeight: '140px', width: '100%' }}
                                        />}
                                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {cat.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Age: {cat.age}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Cuteness: {cat.cuteness}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Link>
                    ))}
                </Carousel>
            ) : (
                <SillyLoading />
            )
            }
        </Box >
    );
}

function MyCats() {
    return (
        <Box sx={{ bgcolor: '#f8faca' }}>
            <CatsTable />
            <Divider />
        </Box>
    );
}

export default MyCats;
