import ApiActions from '../../actions/api';
import Constants from './constants';
import { store } from 'store/store.js';
import swal from 'sweetalert';

class Actions {

    static login(data, history, userdata) {
        if (data.email) 
            window.location.href = ('/listing');

        // ApiActions.post(
        //     '/api/v1/public/login/user',
        //     data,
        //     store,
        //     Constants.GET_DATA,
        //     Constants.GET_DATA_RESPONSE,
        //     (err, response) => {

        //         if (!err) {

        //             if (response.data) {
        //                 //access local storage
        //                 const expireTime = new Date(new Date().getTime() + (3600*1000))
        //                 localStorage.setItem('jwtToken', response.data);
        //                 localStorage.setItem('expiresIn', expireTime); 
        //                 localStorage.setItem('expiryTime', 3600); 
                        
                        
        //                 if (userdata !== undefined && userdata !== null) {
        //                     localStorage.setItem('userdata', JWT.sign(userdata,'shhhhh'))
        //                 }
        //                 swal({
        //                     title: "Login",
        //                     text: "Login Successfully",
        //                     icon: "success"
        //                 });

        //                 const userType = JWT.decode(response.data);
        //                 localStorage.setItem('usertype', userType.usertypeid); 
        //                 if (userType.usertypeid === 2) {
        //                    window.location.href = ('/user/dashboard');
        //                 } else if (userType.usertypeid === 3) {
        //                     window.location.href = ('/vendor/dashboard');
        //                 }
        //             }
        //         } else {
        //             swal({
        //                 title: "Error",
        //                 text: "Incorrect Username Password",
        //                 icon: "error"
        //             });
        //         }

        //     }
        // );
    }

    static getUsers(id) {

        let keyObject = {};
        keyObject['id'] = id;
         
        // ApiActions.get(
        //     '/api/v1/admin/user/get',
        //     keyObject,
        //     store,
        //     Constants.GET_USERS,
        //     Constants.GET_USERS_RESPONSE
        // )
    }

    static setAuthorizationToken(token) {

        store.dispatch({
            type: Constants.SET_AUTHORIZATION,
            token
        });
    }

    static showForgotPassword() {
        
        store.dispatch({
            type: Constants.SHOW_FORGOT_PASSWORD
        })
    }

    static authCheckStatus(history){
        const token = localStorage.getItem('jwtToken'); 
        if(!token){
            store.dispatch({
                type: Constants.CLEAR_AUTHORIZATION
            })
        }
        else{
            const expiresIn = new Date(localStorage.getItem('expiresIn'));
            this.setAuthorizationToken(token)
            if (history){
                history.push('/user/dashboard');
            }
        }
    }

    static vendorAuthCheckStatus(history) {
        const token = localStorage.getItem('jwtToken'); 
        if(!token){
            store.dispatch({
                type: Constants.CLEAR_AUTHORIZATION
            })
        }
        else{
            const expiresIn = new Date(localStorage.getItem('expiresIn'));
            this.setAuthorizationToken(token)
            if (history){
                history.push('/vendor/dashboard');
            }
        }
    }

    static forgot(data, history) {
                
        ApiActions.put(
            '/api/v1/public/auth/reset/password',
            data,
            store,
            Constants.FORGOT_PASSWORD,
            Constants.FORGOT_PASSWORD_RESPONSE,
            (err, response) => {

                if (!err) {
                    swal({
                        title: "Success",
                        text: "Your Password will send to your Email",
                        icon: "success"
                    });
                } else {
                    swal({
                        title: "Error",
                        text: "Incorrect Username",
                        icon: "error"
                    });
                }
            }
        );
    }

}


export default Actions;
