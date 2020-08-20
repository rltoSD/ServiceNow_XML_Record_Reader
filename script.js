
// this section handles link parsing 
var requestBody = ""; 
var link = window.location.toString();
console.log(link);
var val = document.getElementById('div12345').innerText;
var loc = new URL(link);
var split = link.split('%');
var alt_table_name = (split[1].slice(2, split[1].length-3));
console.log(alt_table_name);
var sysid = (split[3]).slice(2,(split[3].length));
var http = loc.protocol; 
var link = loc.host; 
console.log(split);
console.log(sysid);

console.log(split[5]);
console.log(link);
console.log(http);
console.log(loc.pathname);
console.log(loc.sys_id);

var client=new XMLHttpRequest();
var link_to_record = http + "//" + link + "/api/now/table/" + alt_table_name + "/" + sysid + "?sysparm_fields=";

// This part, we have the link built and then we send the get request. 
console.log(link_to_record);
client.open("get", link_to_record);
client.setRequestHeader('Accept','application/json');
client.setRequestHeader('Content-Type','application/json');

//Eg. UserName="admin", Password="admin" for this code sample.
// Todo but right now this only works on admin admin logins.
client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+'admin'));

// This is where we get the data, build the string to display to the users.
client.onreadystatechange = function() { 
	if(this.readyState == this.DONE) {
        console.log(this.response);
        list = JSON.parse(this.response);

        // val is from what we have read in above, 
        // we can pass in a test string right here instead of val to force a specific field to be displayed
        let keys = getKeys(val);
        
        alert(ts(list, keys));
        
	}
}; 
client.send(requestBody);

/**
 * ts() is a function that takes in the object keys and outputs 
 * a nice string thats easy for the user to read.
 * 
 * input: list is the parsed json file (array object) 
 *        keys are the elements of the json file (aka the fields on the record) 
 * 
 * output: nicely formatted string that displays the name of the field and the record.
 */
function ts(list, keys){
    var str = "Database Values\n\n"
    for (elt in keys){

        if(list.result[keys[elt]] != undefined && list.result[keys[elt]].length != 0){
            console.log(keys[elt]);
            str = str.concat(keys[elt], ": ");
            str = str.concat(list.result[keys[elt]])
            str = str.concat("\n");
        }

    }
    return str;
}

/** 
 *  getKeys takes in a string as input and outputs a list of fields that the string was comrpsied of.
 *  
 *  input: inputS is a string with fields separated by ',' and no spaces. (Ex. opened_at,state)
 *  output: array of fields.
 * 
 */
function getKeys(inputS){
    var split = inputS.split(',');
    return split;
}