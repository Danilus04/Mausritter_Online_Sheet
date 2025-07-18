# Generated by Django 5.2 on 2025-06-23 18:53

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('idSquare', models.AutoField(primary_key=True, serialize=False)),
                ('nameSquare', models.CharField(max_length=100)),
                ('colorSquare', models.CharField(blank=True, max_length=45, null=True)),
                ('widthSquare', models.IntegerField(blank=True, null=True)),
                ('heightSquare', models.IntegerField(blank=True, null=True)),
                ('descriptionSquare', models.TextField(blank=True, null=True)),
                ('effectDescription', models.TextField(blank=True, null=True)),
                ('typeSquare', models.CharField(blank=True, max_length=45, null=True)),
                ('imageSquare', models.TextField(blank=True, null=True)),
                ('worthSquare', models.IntegerField(blank=True, null=True)),
                ('currentUsageSquare', models.IntegerField(blank=True, null=True)),
                ('maxUsageSquare', models.IntegerField(blank=True, null=True)),
                ('tagSquare', models.CharField(blank=True, max_length=45, null=True)),
                ('damage1Square', models.CharField(blank=True, max_length=10, null=True)),
                ('damage2Square', models.CharField(blank=True, max_length=10, null=True)),
                ('valueArmorSquare', models.IntegerField(blank=True, null=True)),
                ('conditionEffectSquare', models.CharField(blank=True, max_length=100, null=True)),
                ('usageTypeSquare', models.CharField(blank=True, max_length=45, null=True)),
                ('isMagical', models.BooleanField(default=False)),
                ('pesoSquare', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'Square',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('idUser', models.AutoField(primary_key=True, serialize=False)),
                ('nameUser', models.CharField(max_length=45)),
                ('passwordUser', models.CharField(max_length=200)),
            ],
            options={
                'db_table': 'User',
            },
        ),
        migrations.CreateModel(
            name='UserItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('PositionX', models.IntegerField(blank=True, null=True)),
                ('PositionY', models.IntegerField(blank=True, null=True)),
                ('currentUsageSquare', models.IntegerField(blank=True, null=True)),
                ('item_base', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_instances', to='app.item')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inventory_items', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Item do Usuário',
                'verbose_name_plural': 'Itens do Usuário',
            },
        ),
    ]
