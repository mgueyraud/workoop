from rest_framework import serializers

from .models import Product

# Aca lo que hacemos es pasar a una forma readable para que se pueda pasar al frontend con rest framework


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "title", "description"]
