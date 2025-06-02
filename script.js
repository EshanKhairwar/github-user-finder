
let form=document.querySelector("form")
let searchBtn=document.querySelector(".search")
let usernameInp=document.querySelector(".usernameinp")

let card=document.querySelector(".card")


function getProfileData(username){
return fetch(`https://api.github.com/users/${username}`).then(raw=>{
    if(!raw.ok) throw new Error("User Not FOund")
        else return raw.json()
})
}

function decorateProfileData(details){
    console.log(details)
    let data=`
            <div class="bg-gray-800 shadow-md rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
                <img
                    src="${details.avatar_url}"
                    alt="User Avatar"
                    class="w-24 h-24 rounded-full border-2 border-gray-600"
                />
                <div class="flex-1">
    
                    <h2 class="text-xl font-bold text-white">${details.name}</h2>
                    <p class="text-gray-300">${details.bio}</p>
                    <div class="mt-2 text-sm text-gray-400">
                        <div><strong>Username:</strong> @${details.login}</div>
                        <div><strong>Location:</strong> ${details.location}</div>
                        <div><strong>Company:</strong>${details.company} </div>
                        <div><strong>Public Repos:</strong> ${details.public_repos}</div>
                        <div><strong>Followers:</strong> ${details.followers}+</div>
                        <div><strong>Following:</strong> ${details.following}</div>
                        <div><strong>Blog:</strong> <a href=${details.blog} target="_blank" class="text-blue-400 hover:underline">https://github.blog</a></div>
                        <div><strong>GitHub URL:</strong> <a href=${details.html_url} target="_blank" class="text-blue-400 hover:underline">github.com/${details.login}</a></div>
                    </div>
                </div>
            </div>`

            card.innerHTML=data;
}

function getUserRepos(username){
return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then(raw=>{
    if(!raw.ok) throw new Error("Failed to fetch repos....")
        else return raw.json()
})
}

getProfileData('EshanKhairwar').then(data=>console.log(data))

// getUserRepos('EshanKhairwar').then(data=>console.log(data))


searchBtn.addEventListener('click',function(e){
    e.preventDefault()
let username=usernameInp.value.trim();
if(username.length>0){
getProfileData(username).then(data=>decorateProfileData(data))
}
else{
    alert("username has to be fill")
}
})