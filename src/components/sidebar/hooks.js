import { Home, Contacts, AddBox} from '@material-ui/icons';
import {routes} from "../../router/routes";

export const useBuyerTabs = () => [
    {
        Icon: Home,
        text: 'Home',
        route: routes.home
    },
    {
        Icon: Contacts,
        text: 'Appointments',
        route: routes.appointment
    },
]

export const useSellerTabs = () => [
    {
        Icon: Home,
        text: 'Home',
        route: routes.home
    },
    {
        Icon: Contacts,
        text: 'Slots',
        route: routes.slots
    },
    {
        Icon: AddBox,
        text: 'Add new slot',
        route: routes.newSlot
    },

]