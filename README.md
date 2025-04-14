# Mausritter_Online_Sheet

  Este projeto tem como objetivo o desenvolvimento de um Gerenciador de Fichas de Personagem para o RPG Mausritter, como parte das atividades da disciplina de Engenharia de Software.
O Mausritter é um RPG de mesa com regras simples e componentes compactos. Este gerenciador digital foi pensado para facilitar o registro e acompanhamento das informações dos personagens durante as sessões de jogo.
  A aplicação permite criar, editar e armazenar fichas de forma prática e acessível, substituindo as fichas físicas e contribuindo para uma organização mais eficiente. O sistema busca refletir fielmente a estrutura original das fichas do Mausritter, com suporte a atributos, inventário, magias, equipamentos e condições do personagem.

Aqui está a versão revisada do seu texto, com correções de ortografia, coesão e coerência, no formato adequado para um README:

---

## Configuração do Back-end

Para configurar o back-end, siga os passos abaixo:

1. Acesse a pasta do back-end utilizando o comando `cd`:
   ```bash
   cd back-end
   ```

2. Instale o **virtualenv**, caso ainda não o tenha instalado, utilizando o `apt` (Debian/Ubuntu) ou `dnf` (Fedora):
   ```bash
   sudo apt install virtualenv  # ou
   sudo dnf install python3-virtualenv
   ```

3. Crie o ambiente virtual:
   ```bash
   virtualenv venv
   ```

4. Acesse a pasta do ambiente virtual:
   ```bash
   cd venv/bin
   ```

5. Ative o ambiente virtual com o comando:
   ```bash
   source activate
   ```
   
6. Baixe as dependências do back-end usando o arquivo
```bash
   pip install -r requirments.txt
```

7. Rode o back-end com comando
```bash
   python3 manage.py runserver
```
