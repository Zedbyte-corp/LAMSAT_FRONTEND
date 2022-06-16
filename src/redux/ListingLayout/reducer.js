import actions from "./actions";

const initState = {
  listingSaloonLoader: true,
  listingSaloonData: [],
  categorysaloonDetail: [],
  saloonNameList: [],
  initialListingLoader: true,
  locationName: "",
  vendorbynameData: [],
  latlongData: []
};

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_LISTING_SALOON: {
      return {
        ...state,
        listingSaloonLoader: true,
      };
    }
    case actions.GET_LISTING_SALOON_SUCCESS: {
      return {
        ...state,
        listingSaloonLoader: false,
        initialListingLoader: false,
        locationName: action.payload[1],
        listingSaloonData: action.payload[0],
        categorysaloonDetail: [],
      };
    }

    case actions.GET_LOGIN_LISTING_SALOON: {
      return {
        ...state,
        listingSaloonLoader: true,
        initialListingLoader: true,
        listingSaloonData: [],
        categorysaloonDetail: [],
      };
    }

    case actions.GET_LISTING_SALOON_FAILURE: {
      return {
        ...state,
        listingSaloonLoader: false,
        initialListingLoader: false,
        listingSaloonData: [],
        categorysaloonDetail: [],
      };
    }
    case actions.GET_LOGIN_LISTING_SALOON: {
      return {
        ...state,

        listingSaloonLoader: true,
        initialListingLoader: true,
        initialListingLoader: action.initialLoader,
        listingSaloonData: [],
        categorysaloonDetail: [],
      };
    }
    case actions.GET_LOGIN_LISTING_SALOON_SUCCESS: {
      return {
        ...state,
        listingSaloonLoader: false,
        initialListingLoader: false,
        listingSaloonData: action.payload,
        categorysaloonDetail: [],
      };
    }
    case actions.GET_LOGIN_LISTING_SALOON_FAILURE: {
      return {
        ...state,
        listingSaloonLoader: false,
        initialListingLoader: false,
        listingSaloonData: [],
        categorysaloonDetail: [],
      };
    }

    case actions.GET_NEARBY_SALOON: {
      return {
        ...state,

        listingSaloonLoader: true,
        initialListingLoader: true,
        initialListingLoader: action.initialLoader,
        listingSaloonData: [],
        categorysaloonDetail: [],
      };
    }
    case actions.GET_NEARBY_SALOON_SUCCESS: {
      return {
        ...state,
        listingSaloonLoader: false,
        initialListingLoader: false,
        listingSaloonData: action.payload[0],
        categorysaloonDetail: [],
      };
    }
    case actions.GET_NEARBY_SALOON_FAILURE: {
      return {
        ...state,
        listingSaloonLoader: false,
        initialListingLoader: false,
        listingSaloonData: [],
        categorysaloonDetail: [],
      };
    }

    case actions.GET_CATEGORY_SALOON_DETAILS_SUCCESS: {
      return {
        ...state,
        listingSaloonLoader: false,
        initialListingLoader: false,
        categorysaloonDetail: action.payload,
        listingSaloonData: [],
      };
    }

    case actions.GET_CATEGORY_SALOON_DETAILS: {
      return {
        ...state,
        listingSaloonLoader: true,
        initialListingLoader: true,
        categorysaloonDetail: [],
        listingSaloonData: [],
      };
    }

    case actions.SET_SALOON_FAVOURITE_SUCCESS: {
      var wordsa = state.listingSaloonData;

      var categoryNew = state.categorysaloonDetail;
      const favOut = wordsa.filter((word) => word.id == action.payload);
      const catfavOut = categoryNew.filter(
        (catnew) => catnew.id == action.payload
      );
      wordsa.filter((currentValue, index, wordsa) => {
        if (currentValue.id == favOut[0]["id"]) {
          if (wordsa[index].favourite == 1) {
            wordsa[index].favourite = 0;
          } else {
            wordsa[index].favourite = 1;
          }
          return wordsa;
        }
      });

      if (categoryNew) {
        categoryNew.filter((catcurrentValue, index, wordsa) => {
          if (
            categoryNew.length > 0 &&
            catcurrentValue.id == catfavOut[0]["id"]
          ) {
            if (categoryNew[index].favourite == 1) {
              categoryNew[index].favourite = 0;
            } else {
              categoryNew[index].favourite = 1;
            }
            return categoryNew;
          }
        });
      }
      return {
        ...state,
        listingSaloonLoader: false,
        initialListingLoader: false,
        listingSaloonData: wordsa,
        categorysaloonDetail: categoryNew,
      };
    }

    /*
return {
          ...state,
          listingSaloonLoader: false,
          initialListingLoader: false,
          locationName: action.payload[1],
          listingSaloonData: action.payload,
          categorysaloonDetail: []
        };
        */
      case actions.GET_VENDOR_BY_NAME: {
        return {
          ...state,
          initialListingLoader: true,
        };
      }
      case actions.GET_VENDOR_BY_NAME_SUCCESS: {
        return {
          ...state,
          initialListingLoader: false,
          vendorbynameData: action.payload
        };
      }
  
      case actions.GET_VENDOR_BY_NAME_FAILURE: {
        return {
          ...state,
          initialListingLoader: false,
        };
      } 
      
      case actions.GET_CURRENT_LATLONG: {
        return {
          ...state,
          latlongData: action.payload
        }
      }

    default:
      return state;
  }
}
