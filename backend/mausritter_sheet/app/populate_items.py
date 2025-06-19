# populate_items.py

import os
import django
import sys
import random

# Caminho absoluto até a pasta base do projeto
# Caminho absoluto para a pasta 'backend', onde está o manage.py
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)  # Adiciona ao sys.path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mausritter_sheet.settings')
django.setup()
from models import Item


nomes = ["Espada de Ferro", "Escudo de Carvalho", "Poção de Vida", "Arco Longo", "Machado Anão"]
cores = ["vermelho", "azul", "verde", "preto", "branco"]
tipos = ["arma", "armadura", "consumível", "mágico", "raro"]

for i in range(20):
    item = Item(
        nameSquare=random.choice(nomes),
        colorSquare=random.choice(cores),
        widthSquare=random.randint(1, 3),
        heightSquare=random.randint(1, 3),
        descriptionSquare="Item gerado para testes.",
        effectDescription="Efeito surpresa!",
        typeSquare=random.choice(tipos),
        worthSquare=random.randint(10, 100),
        currentUsageSquare=random.randint(0, 10),
        maxUsageSquare=random.randint(5, 15),
        tagSquare="aventura",
        damage1Square="1d6",
        damage2Square="1d4",
        valueArmorSquare=random.randint(0, 5),
        conditionEffectSquare="nenhum",
        usageTypeSquare="manual",
        isMagical=random.choice([True, False]),
        pesoSquare=random.randint(1, 20),
    )
    item.save()

print("Itens inseridos com sucesso!")
