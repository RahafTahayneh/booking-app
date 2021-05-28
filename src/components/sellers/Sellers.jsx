import React from 'react';
import {Grid, makeStyles, CircularProgress} from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import _ from 'lodash';
import 'react-multi-carousel/lib/styles.css';
import {SellerStore} from "../../store/seller";
import SellerCard from './componets/SellerCard'
import {Search} from "../search";
import {Empty} from '../empty'
import {observer} from "mobx-react";
import {LayoutStore} from "../../store/layout";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(2),
        position: 'relative',
        height: '100%'
    },
    search:{
        width: '100%',
        margin: theme.spacing(3, 0)
    } ,
    loading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'centr'
    },
    title: {
        fontSize: '24px',
        textAlign: 'center',
        margin: theme.spacing(2, 0)
    },
    subTitle: {
        fontSize: '12px',
        color: '#6c757d'
    },
    content:{
        height: '100%',
        width: '100%',
        display: 'flex',
        position:'relative'
    },
    container:{
        height: '100%',
        width: '100%',
    },
    icon:{
        justifyContent: 'flex-end'
    }
}));

const Sellers = observer(() => {
    const [loading, setLoading] = React.useState(true);
    const classes = useStyles();
    const {sellers} = SellerStore;
    const [filteredList, setFilteredList] = React.useState(sellers);

    React.useEffect(()=> {
        LayoutStore.showSidebar()
    }, [])

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [loading])

    return (
        <Grid container direction={'column'} alignItems={'center'} wrap='nowrap' className={classes.root}>
            <Grid item className={classes.search}>
                    <Search sellers={sellers} onChange={(arg)=> setFilteredList(arg)}/>
            </Grid>
            <Grid item className={classes.title}>
                List of Sellers
                <p className={classes.subTitle}>Please select a Seller to view details or search for him/her</p>
            </Grid>
            <Grid item className={classes.content}>
                {loading ? <div className={classes.loading}>
                    <CircularProgress size={50}/>
                </div>:
                    filteredList.length !== 0?
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass={classes.container}
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite={false}
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024,
                            },
                            items: 3,
                            partialVisibilityGutter: 40,
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0,
                            },
                            items: 1,
                            partialVisibilityGutter: 30,
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464,
                            },
                            items: 2,
                            partialVisibilityGutter: 30,
                        },
                    }}
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {
                        _.map(filteredList, (seller, index) =>
                            <SellerCard key={index} seller={seller}/>
                        )
                    }
                </Carousel>:
                <Empty />
                }
            </Grid>
        </Grid>);

});

export default Sellers;