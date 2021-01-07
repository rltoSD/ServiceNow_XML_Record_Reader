// Saves options to chrome.storage
function save_options() {
  var input = document.getElementById('input').value;
  var checkAll = document.getElementById('checkAll').checked;
  chrome.storage.local.set({
    input: input,
    checkAll: checkAll
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  
  // Use default value input = '' and checkAll = true. which means 
  //that all values from XML will display on page by default
  chrome.storage.local.get({
    input: '',
    checkAll: true
  }, function(items) {
    //sets the value of the div in order to save settings
    document.getElementById('input').value = items.input;
    document.getElementById('checkAll').checked = items.checkAll;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
