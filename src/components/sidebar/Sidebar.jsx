import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer, Grid,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar
} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {useBuyerTabs, useSellerTabs} from "./hooks";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {logOut} from "./utils";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        fontSize: '2rem',
        color: theme.palette.secondary.main,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    icon: {
        fontSize: '2rem',
        cursor: 'pointer',
        color: theme.palette.secondary.main
    },
}));

const Sidebar = (props) => {
    const {window, mobileOpen, handleDrawerToggle} = props;
    const type = localStorage.getItem('type');
    const sidebarBuyerTabs = useBuyerTabs();
    const sidebarSellerTabs = useSellerTabs();
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory()

    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                {type === 'buyer' ?
                    _.map(sidebarBuyerTabs, ({text, Icon, route, index}) => (
                        <ListItem button key={index} onClick={()=> history.push(route.getPath())}>
                            <ListItemIcon><Icon/></ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))
                    :
                    _.map(sidebarSellerTabs, ({text, index, Icon, route}) => (
                        <ListItem button key={index} onClick={()=> history.push(route.getPath())}>
                            <ListItemIcon><Icon/> </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))
                }
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Grid container alignItems={'center'} direction={'row'} justify={'space-between'} wrap={'nowrap'}>
                        <Grid item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon className={classes.icon}/>
                            </IconButton>
                        </Grid>
                        <Grid item onClick={logOut}>
                            <ExitToAppIcon className={classes.icon}/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}

Sidebar.propTypes = {
    window: PropTypes.func,
};

export default Sidebar;
