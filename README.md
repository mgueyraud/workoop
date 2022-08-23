# Workoop
Trabajo para la materia de Ingeniería del Software 2, de la Universidad Nacional de Asuncion.

## Desarrollo

Para levantar el ambiente de desarrollo es necesario [docker](https://google.com), para instalarlo pueden seguir la [guia de instalación](https://docs.docker.com/engine/install/) de la pagina oficial.

Antes de levantar el proyecto, asegurarse de tener las variables de entorno necesarias, cambiar los .env.example a .env, con las variables necesarias, despues de eso procedemos a levantar el proyecto.

Una vez instalado docker, se corre el comando:
```bash
docker-compose up --build
```

Con esto se genera las imagenes, pudiendo asi ver el backend en el puerto 8000 y el frontend en el puerto 3000.

Para poder tener super usuarios en django se corre el comando:
```bash
docker exec -ti workoop-backend python manage.py createsuperuser
```

## Produccion

El backend django lo tenemos corriendo en heroku, el frontend con NextJS esta corriendo en vercel, seguidamente podran ver las urls de produccion de los distintos proyectos:

- Django: [workoop-backend.herokuapp.com](https://workoop-backend.herokuapp.com/)
- NextJS: [workoop-frontend.vercel.app](https://workoop-frontend.vercel.app/)

Para el proceso de deploy, estos estan configurados de tal manera que cuando se hace commit en la rama main, se deployan de forma automatica a los servidores. Para esto ideamos un modelo para la forma de contribución al proyecto.

## Contribucion

Para contribuir al proyecto trabajamos con rama features y pull requests, cuando queremos agregar un nuevo feature o integracion, lo que hacemos es crear una rama nueva desde main
```bash
git checkout -b feature/nueva_integracion
```
Una vez hacemos los cambios requeridos, y realizamos los commits sobre la rama. Procedemos a crear un pull request, uno de los que mantenemos el proyecto lo aceptamos y se procede a hacer el deploy de forma automatica cuando se hace el merge.
