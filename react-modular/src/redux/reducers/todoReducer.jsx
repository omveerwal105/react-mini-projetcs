const todoInitialState = {
    tasks : [],
    filter : 'ALL'
}

const todoReducer = (state = todoInitialState , action) => {
    switch (action.type) {
        case 'ADD_TODO' :
            if(!action.payload || !action.payload.trim()) return state ;
            const  newTask = {text : action.payload.trim() , id : Date.now() , completed : false};
            return {
                ...state ,
                tasks : [...state.tasks , newTask]
            }
        case 'DELETE_TODO':
            return {
                ...state , 
                tasks : state.tasks.filter((task)=>task.id!==action.payload)
            }
        case 'TOGGLE_TODO' :
            return {
                ...state ,
                tasks : state.tasks.map((task)=>task.id === action.payload ?
                {...task , completed : !task.completed} : task
            )
            }
        case 'SET_FILTER' :
            return {...state , filter : action.payload};

            default :
            return state ;
    }
}

export default todoReducer;