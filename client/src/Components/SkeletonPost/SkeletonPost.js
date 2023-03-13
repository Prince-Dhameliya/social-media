import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

function SkeletonPost() {

  return (
    <Card sx={{ border: "1px solid rgb(218, 218, 218)",maxWidth: 800, m: 0, borderRadius: 1 }}>
        <CardHeader
            avatar={
                <Skeleton animation="wave" variant="circular" width={35} height={35} style={{ marginTop: 3}} />
            }

            action={
                <Skeleton
                animation="wave"
                height={20}
                width={30}
                style={{ marginTop: 11, marginRight : 8}}
                />
            }

            title={
                <Skeleton
                animation="wave"
                height={20}
                width={120}
                style={{ marginTop: 2, marginLeft: -5 }}
                />
            }

            subheader={
                <></>
            }

            sx={{height: 30}}
        />


        {
            <Skeleton sx={{ height: 350, }} animation="wave" variant="rectangular" />
        }

        <CardContent sx={{height: 170}}>
            {
            <React.Fragment>
                <Skeleton animation="wave" height={30} style={{ marginBottom: 10, marginTop: -10, borderRadius: 10 }} />
                <Skeleton animation="wave" height={20} width="20%" style={{ marginBottom: 10 }} />
                <Skeleton animation="wave" height={20} width="50%" style={{ marginBottom: 10 }} />
                <Skeleton animation="wave" height={20} width="40%" style={{ marginBottom: 10 }} />
                <Skeleton animation="wave" height={20} width="30%" />
            </React.Fragment>
            }
        </CardContent>
        <CardHeader
            avatar={
                <Skeleton animation="wave" variant="circular" width={35} height={35} />
            }

            title={
                <Skeleton
                animation="wave"
                height={30}
                width="70%"
                style={{ marginBottom: 0, borderRadius:10 }}
                />
            }

            subheader={
                <></>
            }

            sx={{height: 30, marginTop: -4}}
        />
    </Card>
  );
}

export default SkeletonPost