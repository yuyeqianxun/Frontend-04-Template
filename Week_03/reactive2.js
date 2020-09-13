let object = {
    a: 1,
    b: 2
}

let callbacks = [];

function reactive(object){
    return new Proxy(object,{
        set(obj, prop, val){
            obj[prop]=val;
            for(let callback of callbacks){
                callback();
            }
            return obj[prop];
        },
        get(obj, prop){
            console.log(obj,prop);
            return obj[prop];
        }
    })
}

function effect(callback){
    callbacks.push(callback);
}

let po = reactive(object);

effect(()=>{
    console.log(po.a);
})


