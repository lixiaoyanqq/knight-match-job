export const zip = ([x,...xs], [y,...ys]) => {
    if(x === undefined || y === undefined){
        return []
    } else {
        return [[x,y], ...zip(xs, ys)]
    }
}