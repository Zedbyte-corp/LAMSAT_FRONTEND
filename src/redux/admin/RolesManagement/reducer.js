import actions from './actions';
import ObjectAssign from 'object-assign';


const initialState = {
    loading: false,
    redirect:false,
    hasError: {},
    help: {},
    error: null,
    langLists: {},
    status:'',
    rolename:'',
    rolesData: [],
    rolesJson: [],
    singleRoleData: [],
    fruitsparent: [],
    fruitschild: [],
    rolesassignedData:[],
    checkedItems: new Map(),
    isRolesProfile: true,
    isRolesSave:true,
    createupdateloader: false,
    deleteRoleloader: false

};

const reducer = function (state = initialState, action) {

    switch (action.type) {

        case actions.GET_ROLES: {

            return ObjectAssign({}, state, {
                loading: true
            });
        }
        case actions.GET_ONLY_ROLES: {
            return ObjectAssign({}, state, {
                loading: true,
                redirect:false,
                status:'',
                rolename:'',
                rolesData: [],
                rolesJson: [],
                singleRoleData: [],
                fruitsparent: [],
                fruitschild: [],
                rolesassignedData:[],
                isRolesProfile:false
            });
        }
        case actions.CREATE_ROLE_JS: {
            return ObjectAssign({}, state, {
                loading: true,
                isRolesSave:false,
                createupdateloader: true
            });
        }
        case actions.STATUS_ROLE: {
            return ObjectAssign({}, state, {
                loading: true
            });
        }


        case actions.FIND_USER: {
            return {
                ...state,
                modal_show: true,
                form_data: action.payload
            };
        }

        case actions.ROLENAME: {
            return ObjectAssign({}, state, {
                loading: false,
                rolename:action.value
            });
        }

        case actions.ROLESTATUS: {
            return ObjectAssign({}, state, {
                loading: false,
                status:action.value
            });
        }


        case actions.UPDATE_ROLE: {
            return ObjectAssign({}, state, {
                loading: true,
                createupdateloader: true
            });
        }
        case actions.UPDATE_RESPONSE: {
            return ObjectAssign({}, state, {
                redirect: true
            });
        }



        case actions.GET_SINGLE_ROLES: {
            return ObjectAssign({}, state, {
                loading: true,
                redirect:false,
                status:'',
                rolename:'',
                rolesData: [],
                rolesJson: [],
                singleRoleData: [],
                fruitsparent: [],
                fruitschild: [],
                rolesassignedData:[],
                isRolesProfile: false
            });
        }

        case actions.ASSIGNED_ROLES_RESPONSE: {
            return ObjectAssign({}, state, {
                loading: false,
                redirect:false,
                rolesassignedData: action.payload,
                isRolesProfile:false,
                deleteRoleloader: false

            });
        }



        case actions.UPDATE_PARENT_CHECK: {
            var k,l; var arr,fruitsparent,fruitschild = [];
                        if(action.clicked === ''){
                            action.rolesData.map((item, ind) => {
                                if(item.id == action.object.parent_active_checked){
                                   removeDuplicates(removeA(state.fruitsparent,item.id));
                                    arr = item.list.split(",");
                                    arr.map((child, i) => {
                                        //var joi = "{'id:'"+item.id+"/"+child+"'state':1}";
                                        var joi = item.id+"/"+child;
                                     removeDuplicates(removeA(state.fruitschild,joi));
                                    })
                                }

                            })
                        }else{
                            var fruitsparent1 = [];
                            var fruitschild1 = [];
                            action.rolesData.map((item, ind) => {
                                if(item.id == action.object.parent_active_checked){


                                       removeDuplicates(fruitsparent1.push(item.id))
                                    arr = item.list.split(",");
                                    arr.map((child, i) => {
                                        var joi = item.id+'/'+child;
                                        removeDuplicates(fruitschild1.push(joi))
                                    })

                                }
                            })
                        }
                        if(action.clicked === ''){
                            return ObjectAssign({}, state, {
                                rolesData:action.rolesData,
                                fruitsparent : removeDuplicates(state.fruitsparent),
                                fruitschild: removeDuplicates(state.fruitschild)
                            });
                        }else{
                            return ObjectAssign({}, state, {
                                rolesData:action.rolesData,
                                fruitsparent : removeDuplicates(state.fruitsparent.concat(fruitsparent1)),
                                fruitschild: removeDuplicates(state.fruitschild.concat(fruitschild1))
                            });
                        }

        }



        case actions.UPDATE_CHILD_CHECK: {
            var joi = action.object.parent_value+'/'+action.value;
                        if(action.clicked === ''){
                            var count =0;
                            if(state.fruitschild.length > 0){removeDuplicates(removeA(state.fruitschild,joi));      }
                                    removeDuplicates(removeA(state.fruitsparent,action.object.parent_value));



                        }else{ var count =0;
                                       removeDuplicates(state.fruitschild.push(joi));

                                    }

                                    action.listData.map((child, i) => {
                                        // ((state.fruitschild.indexOf(action.object.parent_value+'/'+child)) > -1 )?count++:''
                                    })
                                    if(count ==  action.listData.length){removeDuplicates(state.fruitsparent.push(action.object.parent_value))}
                                    if(count >  0){removeDuplicates(state.fruitsparent.push(action.object.parent_value))}
                                   /*   if(count !=  action.listData.length){removeDuplicates(removeA(state.fruitsparent,action.object.parent_value))}*/


                            return ObjectAssign({}, state, {
                                loading: true,
                                fruitsparent : removeDuplicates(state.fruitsparent),
                                fruitschild: removeDuplicates(state.fruitschild)
                            });
        }

        case actions.GET_ONLY_ROLES_RESPONSE: {

            return ObjectAssign({}, state, {
                loading: false,
                rolesData: action.payload,
                redirect:false,
                isRolesProfile:false
            });
        }

        case actions.ROLES_REDIRECT: {
            return ObjectAssign({}, state, {
                loading: false,
                redirect: true,
                isRolesSave:true,
                createupdateloader: false
            });
        }

        case actions.GET_ONLY_SINGLEROLE_RESPONSE: {
            return ObjectAssign({}, state, {
                loading: false,
                singleRoleData: action.payload.data[0],
                rolesData: action.payload.data[0].role_json,
                fruitsparent: action.payload.data[0].role_parent,
                fruitschild: action.payload.data[0].role_child,
                rolename: action.payload.data[0].rolename,
                status: action.payload.data[0].status
            });
        }
        case actions.DELETE_ROLE: {
            return  {
                ...state,
                deleteRoleloader: true
            }
        }
        case actions.DELETE_ROLE_FAILURE: {
            return  {
                ...state,
                deleteRoleloader: false
            }
        }                

        case  actions.GET_ROLES_RESPONSE:{
        }

        default:
            break;
    }

    return state;
};

function removeA(arr, what) {
    var newval;
    var caseval = arr.find((data)=>data == what.charAt(0).toUpperCase() + what.slice(1))
    if(caseval){
        newval = caseval;
    } else {
        newval = what
    }
    var found = arr.indexOf(newval);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(newval);

        arr = arr.filter(function( element ) {
            return element !== undefined;
});
    }
}

function removeDuplicates(arr){
    let unique_array = []
    if(arr){
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }

         unique_array = unique_array.filter(function( element ) {
                return element !== undefined;
            });

    }
}
    /* unique_array = unique_array.filter(function( element ) {
            return element !== undefined;*/
    return unique_array
}
export default reducer;