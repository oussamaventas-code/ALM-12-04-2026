# DIRECTIVA: COPIA_SEGURIDAD_PROYECTO

> **ID:** 2026-04-04_BACKUP
> **Script Asociado:** `run_command (Robocopy)`
> **Última Actualización:** 2026-04-04
> **Estado:** ACTIVO

---

## 1. Objetivos y Alcance
- **Objetivo Principal:** Realizar una copia de seguridad íntegra del proyecto en el escritorio del usuario, añadiendo la fecha actual al nombre de la carpeta.
- **Criterio de Éxito:** La carpeta `ALMELECTRICIDAD_2026-04-04` existe en `C:\Users\Voldemort\Desktop\` y contiene todos los archivos fuente, excluyendo `node_modules` y `.git` para ahorrar espacio.

## 2. Especificaciones de Entrada/Salida (I/O)

### Entradas (Inputs)
- **Ruta Fuente:** `C:\Users\Voldemort\Desktop\ALMELECTRICIDAD`
- **Exclusiones:** `node_modules`, `.git`, `.claude`, `dist`.

### Salidas (Outputs)
- **Artefactos Generados:** Carpeta `C:\Users\Voldemort\Desktop\ALMELECTRICIDAD_2026-04-04` con el respaldo.

## 3. Flujo Lógico (Algoritmo)

1. **Identificación:** Definir la ruta de origen y el nombre de la carpeta destino con la fecha de hoy.
2. **Ejecución:** Utilizar `robocopy` en Windows para una copia recursiva eficiente.
3. **Exclusión:** Asegurar que carpetas pesadas o de control de versiones no se incluyan.
4. **Verificación:** Confirmar la finalización del comando.

## 4. Herramientas y Librerías
- **Herramienta:** `robocopy` (Windows Native Tool).

## 5. Restricciones y Casos Borde (Edge Cases)
- **Permisos:** El script requiere permisos para escribir en el escritorio.
- **Conflicto de Nombres:** Si la carpeta ya existe por un backup previo hoy, `robocopy` simplemente sincronizará los cambios.

## 6. Protocolo de Errores y Aprendizajes (Memoria Viva)

| Fecha | Error Detectado | Causa Raíz | Solución/Parche Aplicado |
|-------|-----------------|------------|--------------------------|
| 04/04 | Inicial | Creación de directiva | N/A |

## 7. Ejemplos de Uso

```powershell
robocopy "c:\Users\Voldemort\Desktop\ALMELECTRICIDAD" "c:\Users\Voldemort\Desktop\ALMELECTRICIDAD_2026-04-04" /S /E /XD node_modules .git .claude dist
```

## 8. Checklist de Pre-Ejecución
- [x] Ruta de origen validada.
- [x] Fecha actual obtenida.

## 9. Checklist Post-Ejecución
- [ ] Carpeta de backup verificada en el escritorio.
