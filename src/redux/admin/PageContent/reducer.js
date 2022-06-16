import actions from './actions';
import ObjectAssign from 'object-assign';

const initialState = {
    modal_show_cms: false,
    modal_show_faq: false,
    form_data_cms: {},
    form_data_faq: {},
    langLists: [],
    cmsLists: [],
    faqLists: [],
    cms_status:'',
    pagetitle:'',
    cms_redirect : false,
    lang_List_out: {},
    singlecmsLists: [],
    arb_content : '',
    eng_content : '',
    slug : '',
    sortorder : '',
    description : '',
    keywords : '',
    arb_pagetitle : '',
    eng_pagetitle : '',
    eng_question : '',
    arb_question : '',
    eng_answer : '',
    arb_answer : '',
    faqstatus : '',
    faq_redirect : false,
    faqid : '',
    all_pageTitle : {},
    all_pageContent : {},
    arr_all_pageTitle : [],
    all_question : {},
    all_answer : {},
    submitLoader: false,
    saloonLanguange: [],
    DummysaloonLanguange: {},
    isPagemanagement: true,
    editLanguange: [],
    initailLoadUpdate:true,
    test:'',
    cms_content:'xxxxxxxxxx',
    yourHtml : "",
    yourHtml1 : "",
    iscmsLoad: false,
    initialLoad:false,
    cmsLoader: false


};
const reducer = function (state = initialState, action) {


    switch (action.type) {

        case  actions.MODAL_SHOW_CMS:{
            return {
                ...state,
                modal_show_cms: !state.modal_show_cms,
                form_data_cms: {}
            }
        }

        case actions.LOADER_SHOW: {
            return ObjectAssign({}, state, {
                submitLoader: !state.submitLoader
            });
        }

        case  actions.MODAL_SHOW_FAQ:{
            return {
                ...state,
                modal_show_faq: !state.modal_show_faq,
                form_data_faq: {}
            }
        }

        case  actions.GET_LANG_LIST_RESPONSE:{
            return {
                ...state,
                langLists: action.payload.data,
            }
        }

        case  actions.GET_CMS_LIST_RESPONSE:{

            return {
                ...state,

                arb_content : '',
                eng_content : '',
                slug : '',
                sortorder : '',
                description : '',
                keywords : '',
                arb_pagetitle : '',
                eng_pagetitle : '',
                eng_question : '',
                arb_question : '',
                eng_answer : '',
                arb_answer : '',
                faqstatus : '',
                faqid : '',
                cms_redirect : false,
                cmsLists: action.payload.data,
                isPagemanagement:false,
            }
        }

        case  actions.GET_SINGLE_CMS_LIST_RESPONSE:{

            let newSaloonLanguage = state.saloonLanguange;
            var i = 0; let arr = {}
            var html1 , html2 = '';
      newSaloonLanguage.map((saloonLanguageList)=>{
       action.payload.data[0].language.map((temp) =>{
        if(saloonLanguageList['id'] === temp.languageid){
            if(temp.languageid == 1 ){ html1 = temp.pagecontent;}
            if(temp.languageid == 2 ){ html2 = temp.pagecontent;}
          saloonLanguageList['pagetitle'] = temp.pagetitle;
          saloonLanguageList['pagecontent'] = temp.pagecontent;
          let obj = {'pagetitle' : temp.pagetitle, 'pagecontent' : temp.pagecontent}
          arr[temp.languageid] = obj;
        }
    })
    i++;
        return saloonLanguageList;
      })


            return {
                ...state,
                singlecmsLists: action.payload.data[0],
                saloonLanguange:newSaloonLanguage,
                DummysaloonLanguange:arr,
                cms_status: action.payload.data[0].status,
                /*
                eng_pagetitle: action.payload.data[0].eng_title,
                arb_pagetitle: action.payload.data[0].arb_title,
                eng_content: action.payload.data[0].eng_content,
                arb_content: action.payload.data[0].arb_content,
                all_pageTitle : action.payload.data[0].title,
                all_pageContent : action.payload.data[0].content,
                keywords: action.payload.data[0].keywords,
                slug: action.payload.data[0].slug,
                cms_status: action.payload.data[0].status,
                sortorder: action.payload.data[0].sortorder,*/
                cms_redirect : false,
                yourHtml:newSaloonLanguage.length>0?html1:'',
                yourHtml1:newSaloonLanguage.length>0?html2:'',
                iscmsLoad:true,
                initialLoad:true            }
        }

        case actions.SET_PAGE_LANGUAGE_DETAILS:{
            let newSaloonLanguage = state.saloonLanguange;
            let newDummyLanguage = state.DummysaloonLanguange;
            newSaloonLanguage.map((saloonLanguageList)=>{

              if(saloonLanguageList['id'] === action.payload['languageid']){
                saloonLanguageList[`${action.payload.key}`] = action.payload.value;
                //newDummyLanguage[saloonLanguageList['id']][action.payload.key] = action.payload.value;
                return saloonLanguageList;
              }
              return saloonLanguageList;
            })
            return {
              ...state,
              saloonLanguange: newSaloonLanguage

            }
          }



    case actions.SET_PAGECONTENT_LANGUAGE_DETAILS:{
    }

    case actions.ASSIGN_PAGE_LANGUAGE:{
        return {
          ...state,
          saloonLanguange: action.payload
      }
      }

        case  actions.GET_SINGLE_FAQ_LIST_RESPONSE:{
            let newSaloonLanguage = state.saloonLanguange;
            var i = 0;var html1,html1 = '';
      newSaloonLanguage.map((saloonLanguageList)=>{
       action.payload.data[0].language.map((temp) =>{
        if(saloonLanguageList['id'] === temp.languageid){
          saloonLanguageList['question'] = temp.question;
          saloonLanguageList['answer'] = temp.answer;

        }

    })
    i++;
        return saloonLanguageList;
      })

            return {
                ...state,
                all_question: action.payload.data[0].question,
                all_answer: action.payload.data[0].answer,
                faqstatus: action.payload.data[0].status,
                faqid: action.payload.data[0].id,
                iscmsLoad:true,
                yourHtml:newSaloonLanguage.length>0?newSaloonLanguage[0].answer:'',
                yourHtml1:newSaloonLanguage.length>0?newSaloonLanguage[1].answer:'',
                iscmsLoad:true,
                initialLoad:true
            }
        }



        case  actions.GET_FAQ_LIST_RESPONSE:{
            return {
                ...state,
                all_question: '',
                all_answer: '',
                faqstatus: '',
                faqid: '',
                faqLists: action.payload.data,
                faq_redirect : false,
                isPagemanagement : false,
            }
        }

        case actions.FIND_CMS: {
            return {
                ...state,
                form_data_cms: action.payload,
                modal_show_cms: true
            }
        }

        case actions.FIND_FAQ: {
            return {
                ...state,
                form_data_faq: action.payload,
                modal_show_faq: true
            }
        }

        case actions.CMS_STATUS: {
            return {
                ...state,
                cms_status: action.value
            }
        }
        case actions.FAQ_STATUS: {
            return {
                ...state,
                faqstatus: action.value
            }
        }

        case actions.CMS_REDIRECT: {
            return {
                ...state,
                cms_redirect: true
            }
        }
        case actions.FAQ_REDIRECT: {
            return {
                ...state,
                faq_redirect: true,
            }
        }

        case actions.ENG_PAGETITLE: {
            return {
                ...state,
                eng_pagetitle: action.value,
            }
        }

        case actions.ARB_PAGETITLE: {
            return {
                ...state,
                arb_pagetitle: action.value,
            }
        }
        case actions.KEYWORDS: {
            return {
                ...state,
                keywords: action.value,
            }
        }
        case actions.DESCRIPTION: {
            return {
                ...state,
                description: action.value,
            }
        }
        case actions.SLUG: {
            return {
                ...state,
                slug: action.value,
            }
        }
        case actions.SORTORDER: {
            return {
                ...state,
                sortorder: action.value,
            }
        }
        case actions.ENG_CONTENT: {
            return {
                ...state,
                eng_content: action.value,
            }
        }
        case actions.ARB_CONTENT: {
            return {
                ...state,
                arb_content: action.value,
            }
        }

        case actions.ENG_QUESTION: {
            return {
                ...state,
                eng_question: action.value,
            }
        }

        case actions.ARB_QUESTION: {
            return {
                ...state,
                arb_question: action.value,
            }
        }

        case actions.ENG_ANSWER: {
            return {
                ...state,
                eng_answer: action.value,
            }
        }
        case actions.ARB_ANSWER: {
            return {
                ...state,
                arb_answer: action.value,
            }
        }
        case actions.ALL_PAGETITLE: {
            var arr = [];
            var obj = {};
            obj['id'+action.id] = action.value;
            arr.push(obj);
            var previousObj = state.all_pageTitle;
            return ObjectAssign({}, state, {
                all_pageTitle:{...previousObj, ...obj},
            });
        }
        case actions.ALL_PAGECONTENT: {
            var arr = [];
            var obj = {};
            obj['id'+action.name] = action.value;
            arr.push(obj);
            var previousObj = state.all_pageContent;
            return ObjectAssign({}, state, {
                all_pageContent:{...previousObj, ...obj},
            });
        }
        case actions.ALL_QUESTION: {
            var arr = [];
            var obj = {};
            obj['id'+action.id] = action.value;
            arr.push(obj);
            var previousObj = state.all_question;
            return ObjectAssign({}, state, {
                all_question:{...previousObj, ...obj},
            });
        }
        case actions.ALL_ANSWER: {
            var arr = [];
            var obj = {};
            obj['id'+action.name] = action.value;
            arr.push(obj);
            var previousObj = state.all_answer;
            return ObjectAssign({}, state, {
                all_answer:{...previousObj, ...obj},
            });
        }

        case actions.ASSIGN_SALOON_LANGUAGE:{
            return {
            ...state,
            saloonLanguange: action.payload
        }
        }


        case actions.UPDATE_CMS:{
            return {
            ...state,
            saloonLanguange: action.payload
        }
        }

        case actions.INITIAL_LOAD:{
            return {
            ...state,
            initailLoadUpdate: action.value
        }
        }
        case actions.CKEDITOR_OUTPUT1:{
            return {
            ...state,
            test: action.value
        }
        }

        case actions.CMS_CONTENT:{
            return {
            ...state,
            cms_content: action.value
        }
        }


        case actions.UPDATE_CMS:{
            return {
            ...state,
            iscmsLoad: false
        }
        }
        case actions.CREATE_CMS: {
            return {
                ...state,
                cmsLoader: true
            }
        }        
        case actions.CREATE_CMS_SUCCESS: {
            return {
                ...state,
                cmsLoader: false
            }
        }   
        case actions.CREATE_CMS_FAILURE: {
            return {
                ...state,
                cmsLoader: false
            }
        }   

        case actions.SET_LANGUAGE_DETAILS:{

            let newSaloonLanguage = state.saloonLanguange;
            newSaloonLanguage.map((saloonLanguageList)=>{

              if(saloonLanguageList['id'] === action.payload.languageid){
                saloonLanguageList[`${action.payload.key}`] = action.payload.value;
                //newDummyLanguage[saloonLanguageList['id']][action.payload.key] = action.payload.value;
                return saloonLanguageList;
              }
              return saloonLanguageList;
            })

            if(action.payload.languageid == 1){
                return {
                    ...state,
                    yourHtml: action.payload.value,
                    saloonLanguange:newSaloonLanguage
                }
            }else{
                return {
                    ...state,
                    yourHtml1: action.payload.value,
                    saloonLanguange:newSaloonLanguage
                }
            }
        }




        case actions.SET_LANGUAGE_ALL_DETAILS:{


            let newSaloonLanguage = state.saloonLanguange;
            let newDummyLanguage = state.DummysaloonLanguange;
            newSaloonLanguage.map((saloonLanguageList)=>{

              if(saloonLanguageList['id'] === action.payload.languageid){
                saloonLanguageList[`${action.payload.key}`] = action.payload.value;
                //newDummyLanguage[saloonLanguageList['id']][action.payload.key] = action.payload.value;
                return saloonLanguageList;
              }
              return saloonLanguageList;
            })

                return {
                    ...state,

                    saloonLanguange:newSaloonLanguage,
                }
        }





        case actions.SET_SALOON_LANGUAGE_DETAILS:{


            if(action.payload.languageid == 2){
                return {
                    ...state,
                    yourHtml: action.payload.value
                }
            }else{
                return {
                    ...state,
                    yourHtml1: action.payload.value
                }
            }
        }


    case actions.SET_SALOON_LANGUAGE_DETAILS_ALL:{
        let newSaloonLanguage = state.saloonLanguange;
        newSaloonLanguage.map((saloonLanguageList)=>{

if(saloonLanguageList['id'] === action.payload['languageid']){
            saloonLanguageList[`${action.payload.key}`] = action.payload.value;
            return saloonLanguageList;
          }
          return saloonLanguageList;
        })
        return {
          ...state,
          saloonLanguange: newSaloonLanguage,
        }
      }
      case actions.LOADED:{
        return {
        ...state,
        initialLoad: false
    }
    }



        default:
            break;
    }

    return state;
};

function removeA(arr, what) {
    var found = arr.indexOf(what);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);

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