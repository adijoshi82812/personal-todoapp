from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user=user)