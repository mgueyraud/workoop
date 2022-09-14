from rest_framework import serializers

from .models import Product, CustomUserModel

# Aca lo que hacemos es pasar a una forma readable para que se pueda pasar al frontend con rest framework


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "title", "description"]


class CustomUserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserModel
        fields = [
            "userId",
            "username",
            "email",
            "password",
        ]

    def create(self, validated_data):
        user = CustomUserModel.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"]
        )

        return user
