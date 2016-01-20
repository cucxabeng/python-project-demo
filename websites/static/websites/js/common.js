var b = 0, e=0;
var pt = 0;
var c,d,f,g;
function change(msg){
	b++;
	if(b==9)b++;
    var a = b%9;
    for(i=1;i<=8;i++){
        $j("#gallery li").removeClass('nv'+i+'current');
    }
    var class_css=".nv"+a;
    $j(class_css).addClass('nv'+a+'current');
    if(b==17){
        stop();
        startpt(msg);
    }
    return;
}
function gif(msg){
    e++;
    for(i=1;i<=8;i++){
        $j("#gallery li").removeClass('nv'+i+'current');
    }
    var class_css=".nv"+e;
    $j(class_css).addClass('nv'+e+'current');
    if(e==pt){
        stop();
        var message = document.getElementById('msg');
        message.innerHTML = '<img class="phanthuong" src="images/'+pt+'.png" />' + msg;
        update_slq();
        document.getElementById('btnquayso').disabled = false;
        $j("#loading").css({display: "none"});
        makewhite(class_css);
    }
    return;
}
function makewhite(class_css) {
  f = setTimeout(function() {
	$j(class_css).css('opacity','0.2');
	makeOrange(class_css);
  }, 1000);
}
function makeOrange(class_css) {
  g = setTimeout(function() {
	$j(class_css).css('opacity','1');
	makewhite(class_css);
  }, 1000);
}
function call(id,msg,item){
    b = 0;
    e = 0;
    var itemid='#item'+item;
    $j(itemid).addClass("gift"+id);
    $j(itemid).addClass("isopen");
    $j("#msg").html(msg);
    update_slq();
    openAllCard(id);
   // stop();
    //c = setInterval("change('"+msg+"')",400);
    return;
}
function openAllCard(id){
    abc=[2,3,4,5,6,8,9,10,11,12];
    abc=$j.grep(abc, function(value) {
        return value != id;
      });
//    abc.remove(id);
    for(i=1;i<7;i++){
        var rand = abc[Math.floor(Math.random() * abc.length)];
        if($j("#item"+i).hasClass("isopen")){
            continue;
        };
        $j("#item"+i).addClass("gift"+rand);
        abc=$j.grep(abc, function(value) {
        return value != rand;
      });
    }
    
}
function startpt(msg){
    d = setInterval("gif('"+msg+"')",500);
    return;
}
function stop(){
    clearInterval(c);
    clearInterval(d);
    clearInterval(f);
    clearInterval(g);
    var message = document.getElementById('msg');
    message.innerHTML = "";
}
(function($j)
{
    $j.fn.blink = function(options)
    {
        var defaults = { delay:500 };
        var options = $j.extend(defaults, options);
       
        return this.each(function()
        {
            var obj = $j(this);
            setInterval(function()
            {
                if($j(obj).css("visibility") == "visible")
                {
                    $j(obj).css('visibility','hidden');
                }
                else
                {
                    $j(obj).css('visibility','visible');
                }
            }, options.delay);
        });
    }
}($))

function update_slq(){
     var ajaxRequest;  // The variable that makes Ajax possible!
     try{
       // Opera 8.0+, Firefox, Safari
       ajaxRequest = new XMLHttpRequest();
     }catch (e){
       // Internet Explorer Browsers
       try{
          ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
       }catch (e) {
          try{
             ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
      }catch (e){
			 // Something went wrong
			 alert("Your browser broke!");
             return false;
          }
       }
     }
     // Create a function that will receive data 
     // sent from the server and will update
     // div section in the same page.
     ajaxRequest.onreadystatechange = function(){
       if(ajaxRequest.readyState == 4){
            result = parseInt(ajaxRequest.responseText);
            if(result >= 0 ){
                var slq = document.getElementById('slq');
                slq.innerHTML = result;
            } ;
       }
     }
     // Now get the value from user and pass it to
     // server script.
     var queryString = "?action=slquay";
     ajaxRequest.open("GET.html","common.html" + queryString, true);
     ajaxRequest.send(null);  
}
//Browser Support Code
function ajaxFunction(item){
    if(is_quay){
        location.reload();
        exit;
    }
 var ajaxRequest;  // The variable that makes Ajax possible!
 $j("#loading").css({display: "block"});
 try{
   // Opera 8.0+, Firefox, Safari
   ajaxRequest = new XMLHttpRequest();
 }catch (e){
   // Internet Explorer Browsers
   try{
      ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
   }catch (e) {
      try{
         ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
      }catch (e){
         // Something went wrong
         alert("Your browser broke!");
         return false;
      }
   }
 }
 // Create a function that will receive data 
 // sent from the server and will update
 // div section in the same page.
 ajaxRequest.onreadystatechange = function(){
   if(ajaxRequest.readyState == 4){
              
		result = ajaxRequest.responseText;
		if(result == '0'){
		    alert("Bạn đã hết lượt quay.");
		    //$j("#loading").css({display: "none"});
		}else if(result == '-3'){
		    document.getElementById('btnquayso').disabled = false;
		    //$j("#loading").css({display: "none"});
		    alert("Đã hết phần thưởng, xin mời bạn liên hệ với cskh 19006034.");
		}else if(result == '-2'){
		    document.getElementById('btnquayso').disabled = false;
		    //$j("#loading").css({display: "none"});
		    alert("Chưa chọn được phần thưởng, bạn hãy mở lại.");
		}else if(result == '-1'){
		    //document.getElementById('btnquayso').disabled = false;
		    //$j("#loading").css({display: "none"});
			var frameSrc = "https://mcid.vn/single/login";
			$j('#iframe').attr("src",frameSrc);
            $j('#myModal').modal(
                {
                    escapeClose: false,
                    clickClose: false,
                    showClose: false,
                }
            );
			//$j('#myModal').reveal($j(this).data());
		}else if(result != ""){
			res = result.toString().split("#");
			pt	= parseInt(res[0]);
			call(pt,res[1],item);
            is_quay=1;
		}
   }
 }
 // Now get the value from user and pass it to
 // server script.
 var queryString = "?action=quay";
 ajaxRequest.open("GET.html", "common.html" + queryString, true);
 ajaxRequest.send(null); 
}