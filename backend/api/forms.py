from django.forms import ModelForm
from .models import Status

class UpdateStatusForm(ModelForm):
    class Meta:
        model = Status
        fields = ['current_tab', 'keyboard_activity']