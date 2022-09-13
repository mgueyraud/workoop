from django.urls import path

from . import views

app_name = "workoop"

urlpatterns = [
    path("api/products", views.ProductListView.as_view(), name="workoop_home"),
    path("api/test", views.TestView.as_view(), name="workoop_test")
]
