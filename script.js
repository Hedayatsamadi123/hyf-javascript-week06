
// click me 
const btn = document.querySelector("#search");
const input = document.querySelector("#inputText");


btn.addEventListener('click', function(){
    
    const searchTerm = input.value;
    searchHYFRepos(searchTerm);
});


function fetchJSONData(url, callbackfn){
    const xhr = new     XMLHttpRequest();
    xhr.addEventListener('load', function(){
        console.log("Data loaded.");
        const data = JSON.parse(xhr.responseText);
        callbackfn(data);
    });
    xhr.open('GET', url);
    xhr.send();
}



function searchHYFRepos (searchTerm){
    const url = "https://api.github.com/search/repositories?q=user:HackYourFuture+" + searchTerm;
    const ul = document.querySelector("#repoList");
    ul.innerHTML = '';
    
    fetchJSONData (url, function(searchResult) {
        console.log(searchResult);
        renderRepositories(searchResult.items);
  
    });
}

function renderRepositories (repositories){
    const ul = document.querySelector("#repoList");
    ul.innerHTML = '';
    for (const repo of repositories){
        const li = document.createElement('li');
        ul.appendChild(li);

        li.innerHTML = `<a target="_blank" href="${repo.url}">${repo.name}</a>`;
    }
}
function displayDetails(data){
    console.log('displayDetails',data);
    const ul = document.querySelector("#detailsList");
    for (const obj of data){
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `<a target="_blank" href="${obj.html_url}" ><img class="rounded-circle" style="width:60px" src="${obj.avatar_url}"></a><br>` +
      `<a target="_blank" href="${obj.html_url}">${obj.login}</a><br>`;
      ul.appendChild(li);
    }
  }
