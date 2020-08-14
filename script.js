var requestBody = ""; 
var link = window.location.toString();
console.log(link);

var loc = new URL(link);
var split = link.split('%');
//console.log(split);
//console.log(split[1]);
var alt_table_name = (split[1].slice(2, split[1].length-3));
console.log(alt_table_name);
var sysid = (split[3]).slice(2,(split[3].length));
//var table_name = (split[5]).slice(2,(split[5].length));
var http = loc.protocol; 
var link = loc.host; 
console.log(split);
console.log(sysid);
//console.log(table_name);
console.log(split[5]);
console.log(link);
console.log(http);
console.log(loc.pathname);
console.log(loc.sys_id);

var client=new XMLHttpRequest();
var link_to_record = http + "//" + link + "/api/now/table/" + alt_table_name + "/" + sysid;
console.log(link_to_record);
client.open("get", link_to_record);
//client.open("get","http://localhost:8080/api/now/table/incident/9c573169c611228700193229fff72400?sysparm_fields=sys_created_on%2Copened_at%22");
//client.open("get","https://k8s0088730-node1.sdthunder.lab3.service-now.com/api/now/table/incident/a83820b58f723300e7e16c7827bdeed2?sysparm_fields=opened_at%2Cstate%2Curgency%2Cimpact");
client.setRequestHeader('Accept','application/json');
client.setRequestHeader('Content-Type','application/json');

//Eg. UserName="admin", Password="admin" for this code sample.
client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+'admin'));

client.onreadystatechange = function() { 
	if(this.readyState == this.DONE) {
        //document.getElementById("response").innerHTML=this.status + this.response; 
        console.log(this.response);
        list = JSON.parse(this.response);
        console.log(list);
        //alert(list.result.opened_at);
        let keys = Object.keys(list.result);
        console.log(keys);
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
 */
function ts(list, keys){
    var str = "Database Values\n\n"
    for (elt in keys){

        if(list.result[keys[elt]].length != 0){
            console.log(keys[elt]);
            str = str.concat(keys[elt], ": ");
            str = str.concat(list.result[keys[elt]])
            str = str.concat("\n");
        }

    }
    return str;
}