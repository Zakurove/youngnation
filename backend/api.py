from .models import Session
from django.shortcuts import render
from rest_framework import viewsets, permissions, renderers
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .serializers import  SessionSerializer
from rest_framework.permissions import IsAdminUser, SAFE_METHODS


# Permissions
class IsAdminUserOrReadOnly(IsAdminUser):
    def has_permission(self, request, view):
        is_educators = super(
            IsAdminUserOrReadOnly,
            self).has_permission(request, view)
        # Python3: is_admin = super().has_permission(request, view)
        return request.method in SAFE_METHODS or is_educators

# If the user is in the Educators group, they will be able to do add sets
class IsEducator(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.groups.filter(name='Educators'):
            return True
        return request.method in SAFE_METHODS

# Only the owner of the set will be able to change its contents
class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user




# Session
class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    parser_classes = (MultiPartParser, )
    serializer_class = SessionSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)