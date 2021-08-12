import * as actions from '../actions/index.action';

const initialState = {
    active : {
        isPresent : false,
        loading : false,
        data : {}
    },
    inactive : {
        isPresent : false,
        loading : false,
        data : {}
    },
    stakeOperation : {
        isLoading : false,
        completed : false,
        failed : false,
        operationHash : null
    },
    unstakeOperation : {
        isLoading : false,
        completed : false,
        failed : false,
        operationHash : null
    },
    harvestOperation : {
        isLoading : false,
        completed : false,
        failed : false,
        operationHash : null
    }
}

const poolsReducer = (state = initialState , action) => {
    switch(action.type) 
    {
        case actions.START_ACTIVE_POOLS_DATA_FETCH:
            return {
                ...state,
                active : {
                    isPresent : false,
                    loading : true,
                    data : {}
                }
            }
        case actions.ACTIVE_POOLS_DATA_FETCH_SUCCESSFULL:
            return {
                ...state,
                active : {
                    isPresent : true,
                    loading : false,
                    data : action.data
                }
            }
        case actions.ACTIVE_POOLS_DATA_FETCH_FAILED:
            return {
                ...state,
                active : {
                    isPresent : false,
                    loading : false,
                    data : {}
                }
            }
        case actions.CLEAR_ACTIVE_POOLS_DATA:
            return {
                ...state,
                active : {
                    isPresent : false,
                    loading : false,
                    data : {}
                }
            }
        //
        case actions.START_INACTIVE_POOLS_DATA_FETCH:
            return {
                ...state,
                inactive : {
                    isPresent : false,
                    loading : true,
                    data : {}
                }
            }
        case actions.INACTIVE_POOLS_DATA_FETCH_SUCCESSFULL:
            return {
                ...state,
                inactive : {
                    isPresent : true,
                    loading : false,
                    data : action.data
                }
            }
        case actions.INACTIVE_POOLS_DATA_FETCH_FAILED:
            return {
                ...state,
                inactive : {
                    isPresent : false,
                    loading : false,
                    data : {}
                }
            }
        case actions.CLEAR_INACTIVE_POOLS_DATA:
            return {
                ...state,
                inactive : {
                    isPresent : false,
                    loading : false,
                    data : {}
                }
            }
        case actions.INITIATE_STAKING_ON_POOL:
            return {
                ...state,
                stakeOperation : {
                    isLoading : true,
                    completed : false,
                    failed : false,
                    operationHash : null
                }
            }
        case actions.STAKING_ON_POOL_SUCCESSFULL:
            return {
                ...state,
                stakeOperation : {
                    isLoading : false,
                    completed : true,
                    failed : false, 
                    operationHash : action.data
                }
            }
        case actions.STAKING_ON_POOL_FAILED:
            return {
                ...state,
                stakeOperation : {
                    isLoading : false,
                    completed : false,
                    failed : true,
                    operationHash : null
                }
            }
        case actions.CLEAR_STAKING_ON_POOL_RESPONSE:
            return {
                ...state,
                stakeOperation : {
                    isLoading : false,
                    completed : false,
                    failed : false,
                    operationHash : null
                }
            }
        //
        case actions.INITIATE_UNSTAKING_ON_POOL:
            return {
                ...state,
                unstakeOperation : {
                    isLoading : true,
                    completed : false,
                    failed : false,
                    operationHash : null
                }
            }
        case actions.UNSTAKING_ON_POOL_SUCCESSFULL:
            return {
                ...state,
                unstakeOperation : {
                    isLoading : false,
                    completed : true,
                    failed : false, 
                    operationHash : action.data
                }
            }
        case actions.UNSTAKING_ON_POOL_FAILED:
            return {
                ...state,
                unstakeOperation : {
                    isLoading : false,
                    completed : false,
                    failed : true,
                    operationHash : null
                }
            }
        case actions.CLEAR_UNSTAKING_ON_POOL_RESPONSE:
            return {
                ...state,
                unstakeOperation : {
                    isLoading : false,
                    completed : false,
                    failed : false,
                    operationHash : null
                }
            }
        //
        case actions.INITIATE_HARVESTING_ON_POOL:
            return {
                ...state,
                harvestOperation : {
                    isLoading : true,
                    completed : false,
                    failed : false,
                    operationHash : null
                }
            }
        case actions.HARVESTING_ON_POOL_SUCCESSFULL:
            return {
                ...state,
                harvestOperation : {
                    isLoading : false,
                    completed : true,
                    failed : false, 
                    operationHash : action.data
                }
            }
        case actions.HARVESTING_ON_POOL_FAILED:
            return {
                ...state,
                harvestOperation : {
                    isLoading : false,
                    completed : false,
                    failed : true,
                    operationHash : null
                }
            }
        case actions.CLEAR_HARVESTING_ON_POOL_RESPONSE:
            return {
                ...state,
                stakeOperation : {
                    isLoading : false,
                    completed : false,
                    failed : false,
                    operationHash : null
                }
            }
        default:
            return {
                ...state
            }
    }
}

export default poolsReducer;