import '../App.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Welcome = (playerInfo) => {
    console.log('test')
    return (
        <>
            <Card id="welcome-card" sx={{ maxWidth: 750 }}>
                <CardMedia
                    sx={{ height: 200 }}
                    image='https://i0.wp.com/www.thexboxhub.com/wp-content/uploads/2023/07/eyestetix-studio-m0EzHtexapU-unsplash.jpg?w=640&ssl=1'
                />
                <CardContent style={{textAlign: "center"}}>
                    <Typography gutterBottom variant="h5" component="span" style={{backgroundColor: "white"}}>
                        {playerInfo ? `Welcome to BlackJack Mifflin` : 'Sign in for more info'}
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button href="https://twitter.com/intent/tweet" size="small">Share</Button>
                </CardActions>
            </Card>
        </>
    )
};
export default Welcome
