const randomColor = (seed)=>Math.floor(Math.random()*(255-seed))+seed

export const newColor =(seed)=>{
    return 'rgb('+randomColor(seed)+','+randomColor(seed)+','+randomColor(seed)+')'
}