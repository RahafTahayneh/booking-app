import React from 'react';
import {Grid, makeStyles} from "@material-ui/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faFacebookF, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons';

library.add(faFacebookF, faTwitter, faInstagram);
const useStyles = makeStyles((theme) => ({
    root: {},
    icon:{
        padding: theme.spacing(1)
    }
}))
const SocialIcons = () => {
    const classes = useStyles();
    return (<Grid container direction={'row'} className={classes.root} >
            <Grid item className={classes.icon}>
                <FontAwesomeIcon icon={['fab', 'instagram']} size="lg" color={'primary'} className="m-1"/>
            </Grid>
            <Grid item className={classes.icon}>
                <FontAwesomeIcon icon={['fab', 'twitter']} size="lg" color={'primary'}  className="m-1"/>
            </Grid>
            <Grid item className={classes.icon}>
                <FontAwesomeIcon icon={['fab', 'facebook-f']} size="lg" color={'primary'}  className="m-1"/>
            </Grid>
        </Grid>
    )
};

export default SocialIcons;