from django.db import models
from django.contrib.auth.models import User

class CharacterSheet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='character_sheets')

    nameCharacter = models.CharField(max_length=45, null=True, blank=True)
    backgroundCharacter = models.CharField(max_length=45, null=True, blank=True)
    birthsignCharacter = models.CharField(max_length=45, null=True, blank=True)
    coatCharacter = models.CharField(max_length=45, null=True, blank=True)
    lookCharacter = models.CharField(max_length=45, null=True, blank=True)
    UrlImageCharacter = models.CharField(max_length= 255,null=True, blank=True)  

    strCurrentCharacter = models.IntegerField(null=True, blank=True)
    dexCurrentCharacter = models.IntegerField(null=True, blank=True)
    willCurrentCharacter = models.IntegerField(null=True, blank=True)

    strMaxCharacter = models.IntegerField(null=True, blank=True)
    dexMaxCharacter = models.IntegerField(null=True, blank=True)
    willMaxCharacter = models.IntegerField(null=True, blank=True)

    hpCurrentCharacter = models.IntegerField(null=True, blank=True)
    hpMaxCharacter = models.IntegerField(null=True, blank=True)

    pipsCharacter = models.IntegerField(null=True, blank=True)
    levelCharacter = models.IntegerField(null=True, blank=True)
    xpCharacter = models.IntegerField(null=True, blank=True)
    gritCharacter = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f'{self.nameCharacter} (User: {self.user.username})'

class Item(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='item', null=True, blank=True)

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

    def __str__(self):
        return self.nameSquare

class UserItem(models.Model):
    character_sheet = models.ForeignKey(CharacterSheet, on_delete=models.CASCADE, related_name='inventory_items')
    item_base = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='user_instances')
    quantity = models.PositiveIntegerField(default=1)

    PositionX = models.IntegerField(blank=True, null=True)
    PositionY = models.IntegerField(blank=True, null=True)
    currentUsageSquare = models.IntegerField(blank=True, null=True)

    # Exemplo de futuro: custom_name = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        verbose_name = "Item do Personagem"
        verbose_name_plural = "Itens dos Personagens"

    def __str__(self):
        return f"{self.item_base.nameSquare} - {self.character_sheet.nameCharacter}"


    class Meta:
        db_table = 'User'
