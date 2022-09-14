from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import generics
from django.views import View
from .models import Category, Product
from .serializers import ProductSerializer
import environ
# Google login provider imports
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.conf import settings

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
environ.Env.read_env(str(BASE_DIR) + '/.env')

# Create your views here.


class ProductListView(View):
    def get(self, request, id=0):
        if id > 0:
            queryset = list(Product.objects.filter(id=id).values())
            if len(queryset) > 0:
                datos = {'message': 'Success', 'Product': queryset[0]}
            else:
                datos = {'message': 'Product not found...'}
        else:
            queryset = list(Product.objects.values())
            if len(queryset) > 0:
                datos = {'message': 'Success', 'Products': queryset}
            else:
                datos = {'message': 'Products not found...'}
        return JsonResponse(datos)


class TestView(View):
    def get(self, request, id=0):
        return JsonResponse({'message': 'PUreteee'})


class GoogleLoginView(SocialLoginView):
    authentication_classes = []
    adapter_class = GoogleOAuth2Adapter
    callback_url = env.str('GOOGLE_CALLBACK_URL')
    client_class = OAuth2Client
