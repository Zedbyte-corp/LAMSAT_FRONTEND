// SweetAlert Component

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { store } from 'store/store.js';
import { getLocaleMessages } from "redux/helper";

export default {
    sweetConfirmHandler: function (rowData, actions, key) {
        try {
            const MySwal = withReactContent(Swal);
            MySwal.fire({
                title: getLocaleMessages('Are you sure?'),
                text: getLocaleMessages('Once deleted, you will not be able to recover this data!'),
                icon: 'warning',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: getLocaleMessages('OK'),
                cancelButtonText: getLocaleMessages('Cancel'),
            }).then((willDelete) => {
                if (willDelete.value) {
                    store.dispatch({
                        type: actions[`${key}`],
                        payload: rowData
                    })
                } else {
                    return MySwal.fire({
                        title: getLocaleMessages('Safe'), 
                        text: getLocaleMessages('Your data is safe!'), 
                        icon:'info',
                        showCloseButton: false,
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        } catch (e) {
            return null;
        }
    },
    // sweetLogoutConfirmHandler: function (history) {
    //     try {
    //         const MySwal = withReactContent(Swal);
    //         MySwal.fire({
    //             title: 'Are you sure?',
    //             text: 'Do you want to logout?',
    //             // icon: 'warning',
    //             showCloseButton: true,
    //             showCancelButton: true
    //         }).then((willDelete) => {
    //             if (willDelete.value) {
                    
    //                 // LogoutActions.userLogout(history);

    //                 // return MySwal.fire('', 'Poof! Your data has been deleted!', 'success');
    //             } else {
    //                 // return MySwal.fire('', 'Your data is safe!', 'error');
    //                 return MySwal.fire({
    //                     title: 'Safe', 
    //                     text: 'Your data is safe!', 
    //                     icon:'info'
    //                 });
    //             }
    //         });
    //     } catch (e) {
    //         return null;
    //     }
    // },
    customConfirmHandler: function (rowData, actions, key) {
        try {
            const MySwal = withReactContent(Swal);
            MySwal.fire({
                title: getLocaleMessages('Are you sure?'),
                text: getLocaleMessages('Once deleted, you will not be able to recover this data!'),
                icon: 'warning',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: getLocaleMessages('OK'),
                cancelButtonText: getLocaleMessages('Cancel'),
            }).then((willDelete) => {
                if (willDelete.value) {
                    store.dispatch({
                        type: actions[`${key}`],
                        payload: rowData
                    })
                } else {
                    return MySwal.fire({
                        title: getLocaleMessages('Safe'), 
                        text: getLocaleMessages('Your data is safe!'), 
                        icon:'info',
                        showCloseButton: false,
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        } catch (e) {
            return null;
        }
    },
    customNewsLetterConfirmHandler: function (rowData, actions, key) {
        try {
            const MySwal = withReactContent(Swal);
            MySwal.fire({
                title: getLocaleMessages('Are you sure?'),
                text: getLocaleMessages('This NewsLetter can be send to all subscribe'),
                icon: 'warning',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: getLocaleMessages('OK'),
                cancelButtonText: getLocaleMessages('Cancel'),
            }).then((willDelete) => {
                if (willDelete.value) {
                    store.dispatch({
                        type: actions[`${key}`],
                        payload: rowData
                    })
                }
            });
        } catch (e) {
            return null;
        }
    }
}
