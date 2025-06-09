from django.db import models
from django.contrib.auth.models import User

class Item(models.Model):
    idSquare = models.AutoField(primary_key=True)
    nameSquare = models.CharField(max_length=100)
    colorSquare = models.CharField(max_length=45, blank=True, null=True)
    widthSquare = models.IntegerField(blank=True, null=True)
    heightSquare = models.IntegerField(blank=True, null=True)
    descriptionSquare = models.TextField(blank=True, null=True)
    effectDescription = models.TextField(blank=True, null=True)
    typeSquare = models.CharField(max_length=45, blank=True, null=True)
    imageSquare = models.TextField(blank=True, null=True)  # você pode trocar para URLField se quiser
    worthSquare = models.IntegerField(blank=True, null=True)
    currentUsageSquare = models.IntegerField(blank=True, null=True)
    maxUsageSquare = models.IntegerField(blank=True, null=True)
    tagSquare = models.CharField(max_length=45, blank=True, null=True)
    damage1Square = models.CharField(max_length=10, blank=True, null=True)
    damage2Square = models.CharField(max_length=10, blank=True, null=True)
    valueArmorSquare = models.IntegerField(blank=True, null=True)
    conditionEffectSquare = models.CharField(max_length=100, blank=True, null=True)
    usageTypeSquare = models.CharField(max_length=45, blank=True, null=True)
    isMagical = models.BooleanField(default=False)
    pesoSquare = models.IntegerField(blank=True, null=True)
    
    # relacionamento com User (você pode trocar para seu modelo customizado se tiver um)
    #User_idUser = models.ForeignKey(User, on_delete=models.DO_NOTHING, db_column='User_idUser')

    class Meta:
        db_table = 'Square'
        managed = False  # para não deixar o Django tentar criar ou alterar essa tabela

    def __str__(self):
        return self.nameSquare
