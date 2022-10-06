import re
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework import (
    viewsets,
    mixins,
    status
)
from .models import Project, CustomRol, MiembroProyecto
import environ
from pathlib import Path
# Google login provider imports
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_framework.permissions import IsAuthenticated
from workoop import serializers

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
environ.Env.read_env(str(BASE_DIR) + '/.env')

# Create your views here.


class ProjectView(viewsets.ModelViewSet):
    serializer_class = serializers.ProjectDetailSerializer
    queryset = Project.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.ProjectSerializer
        elif self.action == 'create':
            return serializers.ProjectCreateSerializer

        return self.serializer_class

    def get_query(self, request):
        usuario = request.user

        miembros = usuario.miembroproyecto_set.all()

        proyectos_del_usuario = []

        for proyecto in self.queryset:
            if proyecto.scrum_master.id == usuario.id:
                proyectos_del_usuario.append(proyecto)
            else:
                miembros_proyecto = proyecto.miembroproyecto_set.all()
                for miembro in miembros:
                    if miembro in miembros_proyecto:
                        proyectos_del_usuario.append(proyecto)

        # Traemos todos los proyectos
        serializer = self.serializer_class(proyectos_del_usuario, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        """Create new project"""
        serializer.save(creado_por=self.request.user)

    @action(detail=True, methods=['get'], name='Retrieve Roles', serializer_class=serializers.RolSerializer)
    def roles(self, request, pk=None):
        roles = CustomRol.objects.all()

        roles_de_proyecto = roles.filter(proyecto=pk).order_by('-id')

        serializer = self.serializer_class(roles_de_proyecto, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)\


    @action(detail=True, methods=['get'], name='Retrieve Members', serializer_class=serializers.ListMiembrosSerializer)
    def miembros(self, request, pk=None):
        miembros = MiembroProyecto.objects.all()

        miembros_de_proyecto = miembros.filter(proyecto=pk).order_by('-id')

        serializer = self.serializer_class(miembros_de_proyecto, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'], name='Retrieve my role', serializer_class=serializers.ListMiembrosSerializer)
    def my_role(self, request, pk=None):
        miembros = MiembroProyecto.objects.all()

        miembros_de_proyecto = miembros.first(
            proyecto=pk, user=request.user)

        serializer = self.serializer_class(miembros_de_proyecto, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class RoleView(mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = serializers.RolSerializer
    queryset = CustomRol.objects.all()
    permission_classes = [IsAuthenticated]


class MemberView(mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = serializers.CreateMiembrosSerializer
    queryset = MiembroProyecto.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.ListMiembrosSerializer

        return self.serializer_class


class GoogleLoginView(SocialLoginView):
    authentication_classes = []
    adapter_class = GoogleOAuth2Adapter
    callback_url = env.str('GOOGLE_CALLBACK_URL')
    client_class = OAuth2Client
