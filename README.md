# Dans ma ville

## Prérequis

### Packages

- python3
- direnv
- make

### Installation du projet

Activer direnv dans le package `backend` pour activer automatiquement l'environnement virtuel Python à l'intérieur

```bash
python3 -m venv .venv
cd backend
direnv allow
```

L'environnement virtuel devrait automatiquement être chargé.

## Backend

```bash
cd backend
```

### Installer les dépendances

```bash
make install/dev
```

### Lancer le serveur

```bash
make start
```

## Mettre à jour les dépendances

```bash
make update
```

## Déployer l'API

L'API se déploie à chaque merge sur la branche `main`.

Pour tester le déploiement depuis une *pull request*, lui ajouter le tag `deploy-preview`.
