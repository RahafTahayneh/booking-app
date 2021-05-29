import React from 'react';
import {Grid, makeStyles} from "@material-ui/core";
import {isMobile} from 'react-device-detect';
import {LayoutStore} from "../store/layout";
import {Sidebar} from "../components/sidebar";
import {observer} from "mobx-react";

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'hidden',
        height: '100%',
        width: '100%',
    },
    body: {
        backgroundColor: '#fff',
        height: '100%',
        width: props => props.isMobile? '100%' : props.sidebarVisible?  'calc(100% - 240px)' :  '100%',
        marginTop: props => props.sidebarVisible? theme.spacing(5) : 0,
        marginLeft: 'auto',
        position: 'relative',
        '@media (max-width: 700px)': {
            width: '100% !important'
        },
    },

}))

const Layout = observer(({children}) => {
    const {sidebarVisible} = LayoutStore;


    const classes = useStyles({sidebarVisible, isMobile});

    return (
        <Grid container direction="column" wrap="nowrap" alignItems={'center'} className={classes.root}>
            {
                sidebarVisible
                && (
                    <Grid item>
                        <Sidebar />
                    </Grid>
                )
            }
            <Grid className={classes.body} item>
                {children}
            </Grid>
        </Grid>
    )

})

export default Layout;