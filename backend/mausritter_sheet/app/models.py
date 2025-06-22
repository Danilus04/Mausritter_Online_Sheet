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

    def __str__(self):
        return self.nameSquare

class UserItem(models.Model):
    # Este modelo representa uma INSTÂNCIA específica de um Item que pertence a um User
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='inventory_items')
    item_base = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='user_instances')
    quantity = models.PositiveIntegerField(default=1) # Para itens empilháveis (ex: poções)

    PositionX = models.IntegerField(blank=True, null=True)
    PositionY = models.IntegerField(blank=True, null=True)
    # Atributos que o usuário pode alterar para ESTA INSTÂNCIA do item
    # Por exemplo, se uma espada pode ter sua durabilidade reduzida ou aprimorada
    # currentDurability = models.IntegerField(blank=True, null=True)
    currentUsageSquare = models.IntegerField(blank=True, null=True)
    # max_durability = models.IntegerField(blank=True, null=True)
    
    # Se 'currentUsageSquare' e 'maxUsageSquare' do Item puderem ser alterados por instância,
    # você os moveria para cá. Se são características fixas do TIPO de item, ficam no Item.
    # Exemplo: Uma poção pode ter 3 usos, e cada poção que um usuário tem começa com 3 usos
    # e diminui individualmente.

    # Exemplo de um atributo que pode ser afetado por uso:
    # current_charges = models.IntegerField(blank=True, null=True)

    # Você pode adicionar campos para "status" ou "condição" específicos desta instância
    # Por exemplo, "condition" para itens que podem se quebrar
    # condition = models.CharField(max_length=50, blank=True, null=True)
    
    # Se você quiser que o usuário possa renomear um item, adicione um campo aqui
    # custom_name = models.CharField(max_length=100, blank=True, null=True)

    class Meta:

        verbose_name = "Item do Usuário"
        verbose_name_plural = "Itens do Usuário"
        
    def __str__(self):
        return f"{self.item_base.nameSquare} ({self.user.username}'s)"
