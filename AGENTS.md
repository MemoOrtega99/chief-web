# Chief Web — instrucciones de trabajo

## Flujo Git solicitado por el usuario

- Cada cambio solicitado en este repositorio debe terminar, después de validarse, en un commit y en `git push origin main`, salvo que el usuario indique expresamente lo contrario.
- Antes de crear el commit, revisar `git diff` y `git status`.
- Agregar únicamente los archivos relacionados con la solicitud. No incluir `docs/`, `output/` ni otros archivos no rastreados salvo petición explícita.
- Nunca usar `git push --force`, `git reset --hard` ni borrar archivos ajenos al cambio solicitado.
- Si hay cambios previos sin relación, conflictos, credenciales faltantes o el push falla, detenerse y reportarlo en lugar de sobrescribir trabajo.
- Después del push, informar brevemente el hash del commit y si el VPS todavía requiere `git pull`, `git lfs pull` y `docker compose up -d --build`.

## Verificación y comunicación

- Ejecutar la validación disponible y proporcional al cambio antes del commit.
- Mantener los reportes concisos; mostrar logs completos únicamente cuando exista un error o el usuario los solicite.
