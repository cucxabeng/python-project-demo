from django.http import HttpResponseBadRequest, JsonResponse
import requests
import urllib.parse
from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from game import settings

# Create your views here.

def index(request):
    return render(request,'trian/index.html',{})

def authen_inspect(request):
    print ("authen_inspect")
    print(request.session.get('access_token'))
    status = True if 'is_login' in request.session else False
    url = ""
    message = ""
    nickname = ""
    download = 0
    request_time_actived = 0
    if status:
        nickname = request.session['nickname']
        message = "Hãy cài đặt ứng dụng Garena/GAS để tham gia chương trình này."
        download = 1
    else:
        # url_encode = urllib.parse.urlencode(request.build_absolute_uri(reverse('websites:authen-token')))
        url = settings.API_URI+"/oauth/login?client_id="+settings.CLIENT_ID+"&redirect_uri="+urllib.parse.quote(request.build_absolute_uri(reverse('websites:authen-token')))+"&response_type=token&locale=vi-VN&all_platforms=1"

    dict = {"status": status, "message": message, "url":url, "nickname":nickname, "download":download, "request_time_actived": request_time_actived}
    return JsonResponse(dict)



def authen_token(request):
    token = request.GET.get('access_token')
    if token is None:
        return HttpResponseBadRequest()

    if token == "access_denied":
        print("access_denied")
        return HttpResponseBadRequest()

    request.session['access_token'] = token

    r = requests.get(settings.API_URI+'/oauth/user/info/get?access_token='+ token)
    res = r.json()
    if "error" in res:
        print("ERROR")
        request.session.flush()
        # request.session.modified = True
        return HttpResponseBadRequest()
    print(res)

    request.session['is_login'] = True
    request.session['nickname'] = res['nickname']
    # request.session.modified = True
    print(request.build_absolute_uri(reverse('websites:authen-token')))
    return redirect(reverse('websites:index'))
    # return HttpResponse("token: " + token)

def authen_logout(request):
    token = request.session.get('access_token', None)
    if (token):
        request.session.clear()
        url = settings.API_URI+"/oauth/logout?access_token="+token
        return JsonResponse({"status":"ok", "url":url})
    else:
        return HttpResponseBadRequest()
