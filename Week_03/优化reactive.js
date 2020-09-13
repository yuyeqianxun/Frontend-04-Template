let object = {
    a: 1,
    b: 2
}

let callbacks = new Map();
let reactivties = new Map();
let usedReactivties = [];

function reactive(object){
    if(reactivties.has(object)) return reactivties.get(object);
    let proxy = new Proxy(object,{
        set(obj, prop, val){
            obj[prop]=val;
            if(callbacks.get(obj)){
                if(callbacks.get(obj).get(prop)){
                    callback();
                }
            }
            return obj[prop];
        },
        get(obj, prop){
            usedReactivties.push([obj,prop]);
            if(typeof obj[prop]==="object"){
                return reactive(obj[prop]);
            }
            return obj[prop];
        }
    })

    reactivties.set(object,proxy)
}

function effect(callback){
    // callbacks.push(callback);
    usedReactivties = [];
    callback();
    console.log(usedReactivties)
    for(let reactivity of usedReactivties){
        if(!callbacks.has(reactivity[0])){
            callbacks.set(reactivity[0],new Map());
        }
        if(!callbacks.get(reactivity[0]).has(reactivity[1])){
            callbacks.set(reactivity[1],[])
        }
        callbacks.get(reactivity[0]).get(reactivity[1]).push(callback);
    }
}

let po = reactive(object);

effect(()=>{
    console.log(po.a);
})


