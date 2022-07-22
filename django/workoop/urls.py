from django.urls import path

from . import views

app_name = "workoop"

urlpatterns = [path("api/", views.ProductListView.as_view(), name="workoop_home")]
