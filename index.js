
let myLeads = [];
let inputEl = document.getElementById('input-el');
let inputBtn = document.getElementById("input-btn");
let deleteBtn = document.getElementById('delete-btn');
let ulEl = document.getElementById('ul-el');
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
let tabBtn = document.getElementById('tab-btn');

// localStorage.setItem("myLeads", "www.google.com")
// let name1 = localStorage.getItem("myLeads");
// console.log(name1);
// localStorage.clear();

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener('click', function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads)
    })
})


// first way to clear input field by creating a new button
deleteBtn.addEventListener('dblclick', function(){
    localStorage.clear();
    myLeads =[];
    render(myLeads);
    console.log("clicked");
})

// second way by creating a function and calling it in same button click event listner
// function cleatInput(){
//     inputEl.value = "";
// }




function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        // listItems += "<li> <a target='_blank' href ='" + myLeads[i] + "'>"   + myLeads[i] + "</a> </li>";
        listItems += `
                    <li>
                        <a href='${leads[i]}' target='_blank' > ${leads[i]} </a>
                    </li>
                     `
        console.log(listItems);
        // another method to create an element 
        // const li = document.createElement("li");
        // li.textContent = myLeads[i]
        // ulEl.append(li)
    }
    ulEl.innerHTML = listItems;
}


inputBtn.addEventListener('click', function () {
    myLeads.push(inputEl.value);
    // third way by simply doing what is done in next line
    inputEl.value = "";
    // cleatInput();
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    render(myLeads);
    
})




