from django.urls import path, re_path
from . import views
urlpatterns = [
    path('', views.index, name="index"),
    # re_path(r'^(?:.*)/?$', views.index, name="index"),
    # re_path('login', views.index, name="index"),
    # re_path('register', views.index, name="index"),
    # re_path('cardiovascular', views.index, name="index"),
]