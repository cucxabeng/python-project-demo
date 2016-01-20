/*! Tvid Single Site-on | (c) 2014  MCCorp - Tinhvan Group| */
function TvidSingle() {
    this.serverurl = "http://mcid.vn/"; // url kiem tra dang nhap tu server Tvid
    this.urlChecksum = "";  // url kiem tra du lieu tra ve tu server Tvid
    this.checksumMethod = "GET";
    this.id = "";
    this.username ="";
    this.email = "";
    this.firstname = "";
    this.lastname = "";
    this.birthday = "";
    this.gender = "";
    this.checksum = "";
    this.islogin = false;
    // chen url checksum
    this.addUrlChecksump = function(urlChecksump, checksumpMethod) {
        this.urlChecksum = urlChecksump;
        if (checksumpMethod == "post" || checksumpMethod == "POST")
            this.checksumMethod = "POST";
    }
    // kiem tra dang nhap tren server
    this.run = function(){
        $j.getScript(this.serverurl+"/single/check");
    }
    this.resetVar = function(){
        this.id = "";
        this.username ="";
        this.email = "";
        this.firstname = "";
        this.lastname = "";
        this.birthday = "";
        this.gender = "";
        this.checksum = "";
        this.islogin = false;
    }
    this.logout = function(){
        $j("#tvidSSOIFrame").attr({src: this.serverurl+"/single/logout"});
    }
    this.showLoginForm = function(){
        $j("#tvidSSOIFrame").show();
        $j("#tvidSSOIFrame").attr({src: this.serverurl+"/single/login"}).load();
    }
    
}
TvidSSO= new TvidSingle();
$j(document).ready(function(){
    //$("body").append('<iframe id="tvidSSOIFrame" style="display: none"></iframe>');
    $j("#tvidSSOIFrame").hide();
    $j("#tvidSSOIFrame").css(
            {
                "width":"40%",
                "min-width":"300px",
                "height":"600px",
                "border":"none",
            }
            );
});
var tvidAuthCallBack = function(a) {
        if (a != "null") {
            if (TvidSSO.urlChecksum == ""){
                TvidSSO.resetVar();
                callLoginForm(TvidSSO);
                return 0;
            }
            $j.ajax({
                type: TvidSSO.checksumMethod,
                url: TvidSSO.urlChecksum,
                async:true,
                data: {hash: a},
				success: function(msg) {
					msg = $j.parseJSON(msg);
					if(msg.id){
						TvidSSO.id = msg.id;
						TvidSSO.username =msg.username;
						TvidSSO.email = msg.email;
						TvidSSO.firstname = msg.firstname;
						TvidSSO.lastname = msg.lastname;
						TvidSSO.birthday = msg.birthday;
						TvidSSO.gender =  msg.gender;
						TvidSSO.islogin=true;
						window.location.reload(true);
						callProifileForm(TvidSSO);
					}else{
						TvidSSO.resetVar();
						callLoginForm(TvidSSO);
					}
				}
            });               
        } else {
            TvidSSO.resetVar();
            callLoginForm(TvidSSO);
        }
    };
