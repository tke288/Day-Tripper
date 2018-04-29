
function go_get(){
 var base_url = 'https://www.youtube.com/embed?listType=search&list=';
 var search_field = document.getElementById('yourtextfield').value;
 var target_url = base_url + search_field;
 var ifr = document.getElementById('youriframe');
 ifr.src = target_url;
 return false;
}

