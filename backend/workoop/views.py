from django.shortcuts import render
from rest_framework import generics

from .models import Category, Product
from .serializers import ProductSerializer

# Create your views here.


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
