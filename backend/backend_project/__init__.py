from django.db.backends.mysql.base import DatabaseWrapper


def check_database_version_supported(self):
    pass


DatabaseWrapper.check_database_version_supported = check_database_version_supported
