from django.urls import path, include

from . import views
from .views import GoogleLoginView

app_name = "workoop"

urlpatterns = [
    path("api/products", views.ProductListView.as_view(), name="workoop_home"),
    path("api/test", views.TestView.as_view(), name="workoop_test"),
    path("api/auth/", include("dj_rest_auth.urls")),
    path("api/social/login/google/", GoogleLoginView.as_view(), name='google')
]
