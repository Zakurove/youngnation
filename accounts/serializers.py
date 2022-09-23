from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User
# from leads.models import RespMicro

# #Profile Serializer
# class ProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Profile
#         fields = ('role', 'institution', 'name')

# User Serializer
class UserSerializer(serializers.ModelSerializer):
  # profile = ProfileSerializer(required=True)

  class Meta:
    model = User
    fields = ('id','email', 'name', 'role', 'institution')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
  # profile = ProfileSerializer(required=False)

  class Meta:
    model = User
    fields = ('id', 'email', 'password', 'name', 'institution')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    
    user = User.objects.create_user(email=validated_data.get('email', 'no-email'),password=validated_data.get('password', 'no-password'), name=validated_data.get('name', 'no-name'), institution=validated_data.get('institution', 'no-institution'))
    # user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'],)
    # name = self.context.get('view').request.data.get('name')
    # role = self.context.get('view').request.data.get('role')
    # institution = self.context.get('view').request.data.get('institution')
    # # profile = Profile.objects.create(user=user, name=name, role= role, institution=institution)

    return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
  email = serializers.EmailField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Incorrect Credentials")
