from django.db import models
from django.urls import reverse
from django.contrib.postgres.fields import ArrayField
# Para poder usar distintos lenguajes en el admin
from django.utils.translation import gettext_lazy as _
from mptt.models import MPTTModel, TreeForeignKey
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from uuid import uuid4

# Create your models here.


class CustomUserModelManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        """
          Creates a custom user with the given fields
        """

        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password):
        user = self.create_user(
            username,
            email,
            password=password
        )

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class CustomUserModel(AbstractBaseUser, PermissionsMixin):
    userId = models.CharField(
        max_length=255, default=uuid4, primary_key=True, editable=False)
    username = models.CharField(
        max_length=255, unique=True, null=False, blank=False)
    email = models.EmailField(
        max_length=255, unique=True, null=False, blank=False)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    active = models.BooleanField(default=True)

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    created_on = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomUserModelManager()

    class Meta:
        verbose_name = "Custom User"


class ProyectoStatus(models.TextChoices):
    NUEVO = 'NUEVO'
    PENDIENTE = 'PENDIENTE'
    INICIADO = 'INICIADO'
    CANCELADO = 'CANCELADO'
    FINALIZADO = 'FINALIZADO'


class Project(models.Model):
    """
    Proyecto
    """

    creado_por = models.ForeignKey(
        CustomUserModel, on_delete=models.CASCADE, related_name='creado_por'
    )

    titulo = models.CharField(
        verbose_name=_("title"),
        help_text=_("Required"),
        max_length=255,
    )

    descripcion = models.TextField(blank=True)
    scrum_master = models.ForeignKey(
        CustomUserModel, on_delete=models.CASCADE, related_name='scrum_master')

    status = models.CharField(
        max_length=10,
        choices=ProyectoStatus.choices,
        default=ProyectoStatus.NUEVO,
    )

    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.titulo


class Permiso(models.Model):
    nombre = models.CharField(
        max_length=255
    )

    def __str__(self):
        return self.nombre


class CustomRol(models.Model):
    """
        Rol de un proyecto
    """

    proyecto = models.ForeignKey(Project, on_delete=models.CASCADE)

    nombre = models.CharField(
        verbose_name=_("title"),
        help_text=_("Required"),
        max_length=255,
    )

    descripcion = models.TextField(null=True, blank=True)

    permisos = models.ManyToManyField(Permiso)

    def __str__(self):
        return self.nombre


class MiembroProyecto(models.Model):
    user = models.ForeignKey(CustomUserModel, on_delete=models.CASCADE)
    proyecto = models.ForeignKey(Project, on_delete=models.CASCADE, null=True)
    role = models.ForeignKey(CustomRol, on_delete=models.PROTECT, null=True)
    activo = models.BooleanField(default=True)
