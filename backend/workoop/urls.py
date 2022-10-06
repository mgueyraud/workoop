from django.urls import path, include

from . import views
from .views import GoogleLoginView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('api/projects', viewset=views.ProjectView)
router.register('api/roles', viewset=views.RoleView)
router.register('api/miembros', viewset=views.MemberView)

app_name = "workoop"

urlpatterns = [
    path("", include(router.urls)),
    path("api/auth/", include("dj_rest_auth.urls")),
    path("api/social/login/google/", GoogleLoginView.as_view(), name='google')
]
