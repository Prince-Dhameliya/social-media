import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

function Media() {

  return (
    <Card sx={{ maxWidth: 800, m: 0, borderRadius: 3 }}>
        <CardHeader
            avatar={
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
            }

            action={
                <Skeleton
                animation="wave"
                height={20}
                width="70%"
                style={{ marginTop: 9, marginRight : 40}}
                />
            }

            title={
                <Skeleton
                animation="wave"
                height={20}
                width="50%"
                style={{ marginBottom: 0 }}
                />
            }

            subheader={
                <></>
            }

            sx={{height: 30}}
        />


        {
            <Skeleton sx={{ height: 600 }} animation="wave" variant="rectangular" />
        }

        <CardContent sx={{height: 170}}>
            {
            <React.Fragment>
                <Skeleton animation="wave" height={40} style={{ marginBottom: 10, marginTop: -10 }} />
                <Skeleton animation="wave" height={20} width="20%" style={{ marginBottom: 10 }} />
                <Skeleton animation="wave" height={20} width="50%" style={{ marginBottom: 10 }} />
                <Skeleton animation="wave" height={20} width="40%" style={{ marginBottom: 10 }} />
                <Skeleton animation="wave" height={20} width="30%" style={{ marginBottom: 10 }} />
                <Skeleton animation="wave" height={40} style={{ marginTop: -5}} />
            </React.Fragment>
            }
        </CardContent>
    </Card>
  );
}

export default Media