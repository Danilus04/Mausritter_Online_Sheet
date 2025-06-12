import pymysql
pymysql.install_as_MySQLdb()

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mydb',                # Nome do banco
        'USER': 'root',                # Seu usuário do MySQL
        'PASSWORD': 'root',  # Sua senha
        'HOST': 'localhost',           # Ou outro endereço se não for local
        'PORT': '3306',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        }
    }
}
