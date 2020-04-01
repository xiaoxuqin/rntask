import querystring from 'query-string'

let rootUrl = 'https://www.fastmock.site/mock/5e2e9d0a05b81031da82fa0f4aa7240f/api'

let myFetch = {
    get(url,queryParams){
        url = rootUrl+url;
        if(queryParams){
            url += '?'+querystring.stringify(queryParams)
        }
        return fetch(url)
            .then(res=>res.json())
    },


    post(url,body){
        return fetch(rootUrl + url,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    })
        .then(res => res.json())
    
    }
}

export {myFetch};