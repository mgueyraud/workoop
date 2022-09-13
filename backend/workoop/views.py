from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import generics
from django.views import View
from .models import Category, Product
from .serializers import ProductSerializer

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
