from rest_framework import serializers

from .models import CustomUserModel, Project, CustomRol, Permiso, MiembroProyecto

# Aca lo que hacemos es pasar a una forma readable para que se pueda pasar al frontend con rest framework


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


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for projects"""

    class Meta:
        model = Project
        fields = ['id', 'creado_por', 'titulo',
                  'descripcion', 'scrum_master', 'fecha_inicio', 'fecha_fin']
        read_only_fields = ['creado_por', 'id']


class ProjectCreateSerializer(ProjectSerializer):
    class Meta(ProjectSerializer.Meta):
        fields = ProjectSerializer.Meta.fields


class ProjectDetailSerializer(ProjectSerializer):
    scrum_master = CustomUserModelSerializer(read_only=True)
    creado_por = CustomUserModelSerializer(read_only=True)

    class Meta(ProjectSerializer.Meta):
        fields = "__all__"


class PermisoSerializer(serializers.ModelSerializer):
    """Serializer for permisos"""

    class Meta:
        model = Permiso
        fields = ['id', 'nombre']
        read_only_fields = ['id']


class RolSerializer(serializers.ModelSerializer):
    """Serializer for rols"""
    permisos = PermisoSerializer(many=True, required=False)

    class Meta:
        model = CustomRol
        fields = ['id', 'nombre', 'permisos', 'proyecto', 'descripcion']
        read_only_fields = ['id']

    def create(self, validated_data):
        """Create a rol"""
        permisos = validated_data.pop('permisos', [])
        rol = CustomRol.objects.create(**validated_data)
        for permiso in permisos:
            permiso_obj = Permiso.objects.get_or_create(**permiso)
            rol.permisos.add(permiso_obj)

        return rol


class CreateMiembrosSerializer(serializers.ModelSerializer):
    """Serializer for miembros"""

    class Meta:
        model = MiembroProyecto
        fields = ['id', 'user', 'proyecto', 'role', 'activo']
        read_only_fields = ['id']


class ListMiembrosSerializer(serializers.ModelSerializer):
    """Serializer for miembros"""

    user = CustomUserModelSerializer(read_only=True)
    role = RolSerializer(read_only=True)

    class Meta:
        model = MiembroProyecto
        fields = ['id', 'user', 'proyecto', 'role', 'activo']
        read_only_fields = ['id']
