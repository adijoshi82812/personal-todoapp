from django.contrib import admin
from .models import Todo

class TodoAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'description', 'completed')

admin.site.register(Todo, TodoAdmin)